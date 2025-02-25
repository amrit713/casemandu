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
          <p className="flex flex-col items-center justify-center">
            <span>
              Are you sure you would like to{" "}
              <span className={"text-gray-800  font-semibold"}>Logout</span> of
              your account?{" "}
            </span>

            <span className={"font-semibold text-base text-primary"}>
              👋 {user?.user.name}
            </span>
          </p>
        </DialogDescription>

        <DialogFooter className={"w-full gap-2"}>
          <Button className={"w-full"} onClick={onClose}>
            Cancel
          </Button>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
