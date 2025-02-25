import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";
import { constructMetadata } from "@/lib/utils";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={`${recursive.className}  `}>
          <ReactQueryProvider>
            <ModalProvider />
            <Toaster />
            {children}
          </ReactQueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
