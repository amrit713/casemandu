"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getPaymentStatus } from "./actions";
import Confetti from "react-dom-confetti";
import { useEffect, useState } from "react";

import { Spinner } from "@/components/spinner";
import { PhonePreview } from "@/components/phone-preview";
import { formatPrice } from "@/lib/utils";

import { useToast } from "@/hooks/use-toast";

export const ThankYou = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";
  const toast = useToast();

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const { data } = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: async () => {
      await getPaymentStatus({ orderId });
    },
    retry: true,
    retryDelay: 500,
  });

  if (data === undefined) {
    return (
      <Spinner
        subtitle={"This won't take long"}
        title={"Loading your order..."}
      />
    );
  }

  if (data === false) {
    return (
      <Spinner
        subtitle={"This might take a moment."}
        title={"Verifying your payment..."}
      />
    );
  }

  const { configuration, billingAddress, shippingAddress, amount, isPaid } =
    data;

  const { color } = configuration;

  if (isPaid) {
    // @ts-ignore
    toast({
      title: "Email has been sent to your mail",
      description: "Your order has been placed. Thank you 😊",
      variant: "success",
    });
  }

  return (
    <>
      <div
        aria-hidden={"true"}
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
      >
        <Confetti
          active={showConfetti}
          config={{ elementCount: 200, spread: 90 }}
        />
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-xl">
            <p className="text-base font-medium text-primary">Thank you!</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              Your case is on the way!
            </h1>
            <p className={"mt-2 text-base text-zinc-500"}>
              We've received your order and are now processing it
            </p>

            <div className="mt-12 text-sm font-medium">
              <p className="text-zinc-900">Order number</p>
              <p className="mt-2 text-zinc-500">{orderId}</p>
            </div>
          </div>

          <div className="mt-10 border-t border-zinc-200">
            <div className="mt-10 flex flex-auto flex-col">
              <h4 className="font-semibold text-zinc-900">
                You made a great choice!
              </h4>
              <p className="mt-2 text-sm text-zinc-600">
                We at{" "}
                <span className="font-semibold text-zinc-900">CaseMandu</span>{" "}
                believe that a phone case doesn't only need to look good, but
                also last you for the years to come. We offer a 5-year print
                guarantee: If you case isn't of the highest quality, we'll
                replace it for free
              </p>
            </div>
          </div>

          <div className="flex space-x-6 overflow-hidden mt-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
            <PhonePreview
              color={color!}
              croppedImageUrl={configuration.croppedImageUrl!}
            />
          </div>

          <div>
            <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
              <div>
                <p className="font-medium text-gray-900">Shipping address</p>

                <div className="mt-2 text-zinc-700">
                  <address className={"not-italic"}>
                    <span className={"block "}>{shippingAddress?.name}</span>
                    <span className={"block "}>{shippingAddress?.street}</span>
                    <span className={"block "}>
                      {shippingAddress?.postalCode}, {shippingAddress?.city}
                    </span>
                  </address>
                </div>
              </div>

              <div>
                <p className="font-medium text-gray-900">Billing address</p>

                <div className="mt-2 text-zinc-700">
                  <address className={"not-italic"}>
                    <span className={"block "}>{billingAddress?.name}</span>
                    <span className={"block "}>{billingAddress?.street}</span>
                    <span className={"block "}>
                      {billingAddress?.postalCode}, {billingAddress?.city}
                    </span>
                  </address>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 border-t border-zinc-200 py-10 text-sm">
              <div>
                <p className="font-medium text-zinc-900">Payment status</p>
                <p className="mt-2 text-zinc-700">Paid</p>
              </div>{" "}
              <div>
                <p className="font-medium text-zinc-900">Shipping Method</p>
                <p className="mt-2 text-zinc-700">
                  DHL, takes up to 3 working days
                </p>
              </div>
            </div>
          </div>

          <div className={"space-y-6 border-t border-zinc-200 pt-10 text-sm"}>
            <div className="flex justify-between">
              <p className="font-medium text-zinc-900">Subtotal</p>
              <p className="text-zinc-700">{formatPrice(amount)}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-zinc-900">Shipping</p>
              <p className="text-zinc-700">{formatPrice(0)}</p>
            </div>{" "}
            <div className="flex justify-between">
              <p className="font-medium text-zinc-900">Total</p>
              <p className="text-zinc-700">{formatPrice(amount)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
