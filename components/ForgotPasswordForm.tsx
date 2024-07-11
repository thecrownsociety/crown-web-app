"use client";
import { ForgotPasswordFormValidation } from "@/lib/validations/ForgotPasswordFormValidation";
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
import { Dialog, DialogClose } from "./ui/dialog";
import { useQueryClient } from "@tanstack/react-query";

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof ForgotPasswordFormValidation>>({
    resolver: zodResolver(ForgotPasswordFormValidation),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const Login = async (
    values: z.infer<typeof ForgotPasswordFormValidation>
  ) => {
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
      router.push("/Profile");
    }
  };

  const onFinish = async (
    values: z.infer<typeof ForgotPasswordFormValidation>
  ) => {
    setIsLoading(true);
    console.log(values);
    try {
      if (values.password !== values.confirmPassword) {
        toast.error("Confirm password should be same as new password");
      }
      const res = await fetch("/api/users/forgot-password", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (res.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success("Password updated successfully");
        await Login(values);
        form.reset();
      } else if (res.status === 403) {
        toast.error("New Password cannot be same as current password");
      } else {
        toast.error("something went wrong! try again");
      }
    } catch (error) {
      console.log(error);
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
                <FormLabel className="text-white-600">New Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="password"
                    placeholder="Enter your New password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className=" text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white-600">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="password"
                    placeholder="Confirm your Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className=" text-red-600" />
              </FormItem>
            )}
          />

          <Button type="submit">Reset Password</Button>
          {/* <DialogClose>
          </DialogClose> */}
        </form>
      </Form>
    </>
  );
};

export default ForgotPasswordForm;
