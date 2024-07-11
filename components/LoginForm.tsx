"use client";
import { LoginFormValidation } from "@/lib/validations/LoginFormValidation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import ForgotPasswordForm from "./ForgotPasswordForm";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // setIsLoading(true);

  const onFinish = async (values: z.infer<typeof LoginFormValidation>) => {
    setIsLoading(true);
    console.log(values);
    console.log("loading", isLoading);
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      });
      console.log(result);
      if (result?.error) {
        toast.error("Invalid Credentials");
      }

      if (result?.url) {
        toast.success("login successfull");
        // const { data: session } = useSession();
        // console.log("session: ", session);
        router.push("/Profile");
        // router.push(`/Profile`);
      }
    } catch (error) {
      console.log("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFinish)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white-600">Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className=" border-none"
                    type="email"
                    placeholder="Enter your Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className=" text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white-600">Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className=" border-none"
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className=" text-red-600" />
              </FormItem>
            )}
          />

          <div className="flex flex-row justify-between">
            {isLoading ? (
              <div className="loader"></div>
            ) : (
              <Button type="submit">Login</Button>
            )}
            {/* <Dialog>
              <DialogTrigger className="text-red-600">
                Forgot Password?
              </DialogTrigger>
              <DialogContent>
                <ForgotPasswordForm />
              </DialogContent>
            </Dialog> */}
          </div>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
