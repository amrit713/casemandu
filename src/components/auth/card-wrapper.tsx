"use client";
import React from "react";
import Link from "next/link";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface CardWrapperProps {
  children?: React.ReactNode;
  headerLabel: string;
  showSocial?: boolean;
  backButtonHref: string;
  backButtonLabel: string;
  showHomeButton?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
  showHomeButton,
}: CardWrapperProps) => {
  return (
    <Card className={"w-[400px]  border-none"}>
      {!showHomeButton && (
        <div className="pt-4 px-4">
          <Link
            href={"/"}
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "text-gray-700 hover:text-gray-900",
            })}
          >
            <ArrowLeft />
            Back to Home
          </Link>
        </div>
      )}
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter className={"pb-2"}>
          <Social />
        </CardFooter>
      )}

      <CardFooter className={"flex justify-self-start "}>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
