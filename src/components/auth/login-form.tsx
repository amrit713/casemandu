"use client";

import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { loginSchema } from "@/schemas";
import {
  FormItem,
  Form,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Message } from "@/components/message";
import { Loader } from "lucide-react";

export const LoginForm = () => {
  const [success, setSuccess] = useState<null | string>();
  const [error, setError] = useState<null | string>();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const response = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      console.log(response);

      //  TODO: Need to data some error handling in next auth
      if (response?.error) {
        console.log(response.error);
        setError("Invalid Credentials");
      } else {
        form.reset();
        router.push("/");
        router.refresh();

        setSuccess("Login successful");
      }
    } catch (error: any) {
      setError("Invalid");
      console.log(error.message);
    } finally {
      setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 4000);
    }
  };

  return (
    <main className="w-full h-full  flex justify-center items-center">
      <CardWrapper
        headerLabel={"Welcome back"}
        backButtonHref={"/auth/register"}
        showSocial
        backButtonLabel={"Don't have an account?"}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name={"email"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Input
                      {...field}
                      placeholder={"user.doe@example.com"}
                      type={"email"}
                      disabled={isLoading}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"password"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <Input
                      {...field}
                      placeholder={"*******"}
                      type={"password"}
                      disabled={isLoading}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Message success={success} error={error} />
            <Button type={"submit"} className={"w-full"} disabled={isLoading}>
              {isLoading ? (
                <Loader className={"size-4  animate-spin"} />
              ) : (
                <>Login</>
              )}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </main>
  );
};
