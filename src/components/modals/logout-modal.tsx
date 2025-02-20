"use client";

import { signOut } from "next-auth/react";

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

export const LogoutModal = () => {
  const { isOpen, onClose, type } = useModal();

  const modalOpen = isOpen && type === "logout";
  const logoutHandler = async () => {
    try {
      await signOut();
    } catch (error: any) {
      console.error(error);
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
          <span className={"text-gray-800 font-semibold"}>Logout</span> of your
          account?
        </DialogDescription>

        <DialogFooter className={"w-full"}>
          <Button
            className={"w-full"}
            variant={"secondary"}
            onClick={logoutHandler}
          >
            Confirm
          </Button>
          <Button className={"w-full"} onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
