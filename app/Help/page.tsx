"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { contactHelpValidation } from "@/lib/validations/ContactHelpValidation";

export default function ContactHelp() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof contactHelpValidation>>({
    resolver: zodResolver(contactHelpValidation),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof contactHelpValidation>) {
    console.log(values);
    setLoading(true);
    try {
      const res = await fetch("/api/contactHelp", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (res.status === 201) {
        toast.success("Query Raised successfully");
      } else {
        toast.error("Error sending message, please try again");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      form.reset();
    }
  }

  return (
    <div className="flex justify-center items-center mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Contact Help</CardTitle>
          <CardDescription>
            Contact Help if you have encountered some problem on our website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage className=" text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Email</FormLabel>
                    <FormControl>
                      <Input placeholder="JohnDoe@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage className=" text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Need help in..." {...field} />
                    </FormControl>
                    <FormMessage className=" text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Message</FormLabel>
                    <FormControl>
                      <Input placeholder="Hello Gautham,..." {...field} />
                    </FormControl>
                    <FormMessage className=" text-red-600" />
                  </FormItem>
                )}
              />
              <Button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
                disabled={loading}
              >
                {loading ? "sending message..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
