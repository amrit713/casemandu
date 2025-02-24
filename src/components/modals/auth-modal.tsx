"use client";

import { useRouter } from "next/navigation";

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

export const AuthModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  const modalOpen = isOpen && type === "login";
  return (
    <Dialog open={modalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Header title={"Login to continue"} />
          </DialogTitle>
          <DialogDescription className={"text-base text-center py-2"}>
            <span className="font-medium text-zinc-900">
              Your configuration was saved!
            </span>
            Please login or create an account to complete your purchase.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full flex gap-2 flex-1 ">
          <Button
            variant="secondary"
            onClick={() => {
              onClose();
              router.push("/auth/login");
            }}
            className={"w-full"}
          >
            Login
          </Button>

          <Button
            onClick={() => {
              onClose();
              router.push("/auth/register");
            }}
            className={"w-full"}
          >
            Sign up
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
