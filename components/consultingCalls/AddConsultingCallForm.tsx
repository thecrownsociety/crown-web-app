"use client";
import { userTypes } from "@/lib/types";
import { AddConsultingCallsSchema } from "@/lib/validations/AddConsultingCallsFormValidation";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Option } from "@/lib/utils/CreateableSelectDropdown";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import CreateableSelectDropdown from "@/lib/utils/CreateableSelectDropdown";

const AddConsultingCallForm = () => {
  const [interviewers, setInterviewers] = useState<Option[]>([]);
  const [clients, setClients] = useState<Option[]>([]);

  const [interviewerValue, setInterviewerValue] = useState<Option | null>();
  const [clientValue, setClientValue] = useState<Option | null>();

  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const getUsers = async () => {
    const res = await fetch("/api/users");
    const data: userTypes[] = await res.json();
    const adminUsers: Option[] = [];
    const clientUsers: Option[] = [];
    data.filter((d) =>
      d.isAdmin
        ? !adminUsers.some((user) => user.value === d.id)
          ? adminUsers.push({ value: d.id, label: d.name })
          : ""
        : !clientUsers.some((user) => user.value === d.id)
        ? clientUsers.push({ value: d.id, label: d.name })
        : ""
    );
    setInterviewers(adminUsers);
    setClients(clientUsers);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const form = useForm<z.infer<typeof AddConsultingCallsSchema>>({
    resolver: zodResolver(AddConsultingCallsSchema),
    defaultValues: {
      interviewerId: "",
      clientId: "",
      docLink: "",
    },
  });

  const onFinish = async (values: z.infer<typeof AddConsultingCallsSchema>) => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/consultingCalls`, {
        method: "POST",
        body: JSON.stringify({
          interviewerId: interviewerValue?.value,
          clientId: clientValue?.value,
          docLink: values.docLink,
        }),
      });

      if (response.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ["consultingCalls"],
        });
        toast.success("call created successfully");
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
          <ScrollArea className="h-[400px]">
            <FormField
              control={form.control}
              name="interviewerId"
              render={({ field }) => (
                <FormItem className="mt-8 w-[400px]">
                  <FormLabel>Interviewer</FormLabel>
                  <FormControl>
                    <CreateableSelectDropdown
                      options={interviewers}
                      isLoading={isLoading}
                      value={interviewerValue}
                      setValue={setInterviewerValue}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Client */}
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem className="mt-8 w-[400px]">
                  <FormLabel>Client</FormLabel>
                  <FormControl>
                    {/* <CreatableSelect
                      styles={colourStyles}
                      isDisabled={isLoading}
                      placeholder="Select client"
                      isClearable
                      options={clientUsers}
                      required
                    /> */}

                    <CreateableSelectDropdown
                      options={clients}
                      isLoading={isLoading}
                      value={clientValue}
                      setValue={setClientValue}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Doc Link */}
            <FormField
              control={form.control}
              name="docLink"
              render={({ field }) => (
                <FormItem className="mt-8 w-[400px]">
                  <FormLabel>Doc Link</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="text"
                      placeholder="Enter Doc Link"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-8" disabled={isLoading} type="submit">
              Submit
            </Button>
          </ScrollArea>
        </form>
      </Form>
    </>
  );
};

export default AddConsultingCallForm;
