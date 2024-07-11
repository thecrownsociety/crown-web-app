"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Switch } from "../ui/switch";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogClose } from "../ui/dialog";
import { AddUserDetailFormValidation } from "@/lib/validations/AddUserDetailsFormValidation";
import { userTypes } from "@/lib/types";

const EditUserDetailsForm = ({
  data,
  setIsOpen,
}: {
  data: userTypes | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof AddUserDetailFormValidation>>({
    resolver: zodResolver(AddUserDetailFormValidation),
    defaultValues: {
      brokerName: data?.brokerName,
      phoneNumber: data?.phoneNumber,
      investmentGoal: Number(data?.investmentGoal),
      riskTakingCapacity: data?.riskTakingCapacity,
    },
  });

  const onFinish = async (
    values: z.infer<typeof AddUserDetailFormValidation>
  ) => {
    // setIsLoading(true);
    console.log("values", values);
    try {
      const response = await fetch(`/api/users`, {
        method: "PUT",
        body: JSON.stringify({
          brokerName: values.brokerName,
          phoneNumber: values.phoneNumber,
          investmentGoal: values.investmentGoal,
          riskTakingCapacity: values.riskTakingCapacity,
          userId: session?.user.id || "",
        }),
      });
      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success("user updated successfully");
      } else {
        toast.error("something went wrong! try again");
      }
    } catch (error) {
      console.log("something went wrong");
    } finally {
      setIsLoading(false);
      form.reset();
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFinish)} className="space-y-8">
          <FormField
            control={form.control}
            name="brokerName"
            render={({ field }) => (
              <FormItem className="mt-8 w-[400px]">
                <FormLabel>Broker Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className="glass rounded-2xl"
                    type="text"
                    placeholder="Enter Broker Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="mt-8 w-[400px]">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Phone Number"
                    {...field}
                    // onChange={(e) => {
                    //   const value = e.target.value;
                    //   if (value === "") {
                    //     field.onChange(0);
                    //   } else if (Number.isNaN(Number(value))) {
                    //     field.onChange(0);
                    //   } else {
                    //     field.onChange(Number(value));
                    //   }
                    // }}
                    disabled={isLoading}
                    className="glass rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="investmentGoal"
            render={({ field }) => (
              <FormItem className="mt-8 w-[400px]">
                <FormLabel>Investment Goal</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Investment Goal"
                    {...field}
                    disabled={isLoading}
                    className="glass rounded-2xl"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "") {
                        field.onChange(0);
                      } else if (Number.isNaN(Number(value))) {
                        field.onChange(0);
                      } else {
                        field.onChange(Number(value));
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="riskTakingCapacity"
            render={({ field }) => (
              <FormItem className="mt-8 w-[400px]">
                <FormLabel>Risk Taking Capacity</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select am appropriate risk capacity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="veryHigh">Very High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className={`${isLoading && "loader"} mt-2`}
            disabled={isLoading}
            onClick={() => setIsOpen(false)}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EditUserDetailsForm;
