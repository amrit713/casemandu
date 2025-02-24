"use client";

import { useEffect, useState } from "react";

import { LogoutModal } from "@/components/modals/logout-modal";
import { AuthModal } from "@/components/modals/auth-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <LogoutModal />
      <AuthModal />
    </>
  );
};
