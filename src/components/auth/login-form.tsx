"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

export const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values);
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
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type={"submit"} className={"w-full"}>
              {" "}
              Login
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </main>
  );
};
