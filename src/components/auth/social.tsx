"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackURL: DEFAULT_LOGIN_REDIRECT,
    }).then((r) => console.log(`Sign in with ${provider}: ${r}`));
  };
  return (
    <div className="w-full  flex items-center justify-center  gap-4 ">
      <Button
        variant={"outline"}
        className={"w-full"}
        onClick={() => {
          onClick("google");
        }}
      >
        <FcGoogle />
        Google
      </Button>{" "}
      <Button
        variant={"outline"}
        className={"w-full"}
        onClick={() => onClick("github")}
      >
        <FaGithub />
        Github
      </Button>
    </div>
  );
};
