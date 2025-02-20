"use client";

import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { registerSchema } from "@/schemas";
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

export const RegisterForm = () => {
  const [success, setSuccess] = useState<null | string>();
  const [error, setError] = useState<null | string>();
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    console.log(values);
    try {
      await axios.post("/api/auth/register", values);

      form.reset();

      router.refresh();
      setSuccess("Successfully registered!");
    } catch (error: any) {
      console.log(error.response.data);
      setError(error.response.data);
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
        headerLabel={"Create an account"}
        showSocial
        backButtonLabel={"Already have an account?"}
        backButtonHref={"/auth/login"}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name={"name"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      {...field}
                      placeholder={"Eg: John Wich"}
                      disabled={isLoading}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              />{" "}
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
            <Message error={error} success={success} />

            <Button type="submit" className={"w-full"} disabled={isLoading}>
              {" "}
              {isLoading ? (
                <Loader className={"size-4  animate-spin"} />
              ) : (
                <>Sign up</>
              )}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </main>
  );
};
