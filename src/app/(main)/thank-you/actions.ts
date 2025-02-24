"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  const user = await auth();

  if (!user || !user.user.id || !user.user.email) {
    throw new Error("You need to be logged in to view this page.");
  }

  const order = await db.order.findFirst({
    where: {
      userId: user.user.id,
      id: orderId,
    },
    include: {
      billingAddress: true,
      configuration: true,
      shippingAddress: true,
      user: true,
    },
  });

  if (!order) {
    throw new Error("This order does not exist");
  }

  if (order.isPaid) {
    return order;
  }
  return false;
};
