"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Header } from "@/components/auth/header";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { ButtonLoader } from "@/components/button-loader";

export const LogoutModal = () => {
  const { isOpen, onClose, type } = useModal();
  const { data: user } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const modalOpen = isOpen && type === "logout";
  const logoutHandler = async () => {
    try {
      setIsLoading(true);
      await signOut();
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={modalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Header />
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className={"text-center"}>
          Are you sure you would like to{" "}
          <span className={"text-gray-800  font-semibold"}>Logout</span> of your
          account?{" "}
          <span className={"font-semibold text-base text-primary"}>
            {user?.user.name}
          </span>
        </DialogDescription>

        <DialogFooter className={"w-full"}>
          <Button
            className={"w-full"}
            variant={"secondary"}
            onClick={logoutHandler}
            disabled={isLoading}
          >
            <ButtonLoader
              label={"Confirm"}
              isLoading={isLoading}
              loadingText={"Logging out"}
            />
          </Button>
          <Button className={"w-full"} onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
