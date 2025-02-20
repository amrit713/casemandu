"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";

export const Social = () => {
  return (
    <div className="w-full  flex items-center justify-center  gap-4 ">
      <Button variant={"outline"} className={"w-full"}>
        <FcGoogle />
        Google
      </Button>{" "}
      <Button variant={"outline"} className={"w-full"}>
        <FaGithub />
        Github
      </Button>
    </div>
  );
};
