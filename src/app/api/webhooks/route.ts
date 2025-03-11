import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { Resend } from "resend";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { OrderReceivedEmail } from "@/components/emails/order-received-email";
import { finished } from "stream";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = (await headers()).get("stripe-signature");

    if (!signature) {
      return new NextResponse("Invalid signature", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details?.email) {
        return new NextResponse("Missing user email", { status: 400 });
      }

      const session = event.data.object as Stripe.Checkout.Session;
      console.log(session);
      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null,
      };

      if (!userId || !orderId) {
        return new NextResponse("Invalid request metadata", { status: 400 });
      }

      const billingAddress = session.customer_details!.address;
      const shippingAddress = session.shipping_details!.address;

      const updatedOrder = await db.order.update({
        where: {
          id: orderId,
          userId: userId,
        },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: shippingAddress!.city!,
              country: shippingAddress!.country!,
              postalCode: shippingAddress!.postal_code!,
              street: shippingAddress!.line1!,
              state: shippingAddress!.state!,
            },
          },

          billingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: billingAddress!.city!,
              country: billingAddress!.country!,
              postalCode: billingAddress!.postal_code!,
              street: billingAddress!.line1!,
              state: billingAddress!.state!,
            },
          },
        },
        include: {
          configuration: true,
        },
      });

      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: [event.data.object.customer_details.email],
        subject: "Thanks for your order!",
        react: OrderReceivedEmail({
          orderId,
          orderDate: updatedOrder.createdAt.toLocaleString(),
          //@ts-ignore
          shippingAddress: {
            name: session.customer_details!.name!,
            city: shippingAddress!.city!,
            country: shippingAddress!.country!,
            postalCode: shippingAddress!.postal_code!,
            street: shippingAddress!.line1!,
            state: shippingAddress!.state!,
          },
        }),
      });

      if (updatedOrder.isPaid) {
        await fetch("http://localhost:3000/api/v1/events", {
          method: "POST",
          headers: {
            Authorization: "Bearer cm83ye2450001yxr7ifb6u7tu",
          },
          body: JSON.stringify({
            category: "sale",
            fields: {
              amount: updatedOrder.amount, // for example: user id
              email: event.data.object.customer_details.email,
              material: updatedOrder.configuration.material,
              finished: updatedOrder.configuration.finish,
              color: updatedOrder.configuration.color,
              // for example: user email
            },
          }),
        });
      }

      return NextResponse.json({ result: event, ok: true });
    }
  } catch (error) {
    console.log("[REGISTER ERROR]", error);
    return NextResponse.json(
      { message: "Something went wrong", ok: false },
      { status: 500 },
    );
  }
}
