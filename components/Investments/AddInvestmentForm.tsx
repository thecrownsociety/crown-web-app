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
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Switch } from "../ui/switch";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogClose } from "../ui/dialog";
import { userTypes } from "@/lib/types";
import { AddInvestmentFormValidation } from "@/lib/validations/AddInvestmentFormValidation";

const AddInvestmentForm = ({
  id,
  setIsOpen,
}: {
  id: string | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof AddInvestmentFormValidation>>({
    resolver: zodResolver(AddInvestmentFormValidation),
    defaultValues: {
      amount: 0,
      transactionType: "",
    },
  });

  const onFinish = async (
    values: z.infer<typeof AddInvestmentFormValidation>
  ) => {
    setIsLoading(true);
    console.log("values", values);
    try {
      const response = await fetch(`/api/investments`, {
        method: "POST",
        body: JSON.stringify({
          amount: values.amount,
          transactionType: values.transactionType,
          clientId: id,
        }),
      });
      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["investments"] });
        toast.success("transaction submitted successfully");
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
            name="amount"
            render={({ field }) => (
              <FormItem className="mt-8 w-[400px]">
                <FormLabel>Enter Transaction Amount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Transaction Amount"
                    {...field}
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
            name="transactionType"
            render={({ field }) => (
              <FormItem className="mt-8 w-[400px]">
                <FormLabel>Investment Option</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an appropriate Investment Option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Investment">Investment</SelectItem>
                      <SelectItem value="Trading">Trading</SelectItem>
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

export default AddInvestmentForm;
