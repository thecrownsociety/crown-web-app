"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";
import toast from "react-hot-toast";
import InvestmentsTable from "@/components/Investments/InvestmentsTable";

const page = () => {
  const { data } = useSession();

  useLayoutEffect(() => {
    if (!data?.user.isAdmin) {
      toast.error("You do not have permission to access this page.");

      redirect("/Profile");
    }
  }, []);

  return (
    <>
      <div className=" flex justify-center pl-4 pr-4 items-center md:pl-32 md:pr-32 md:mt-10">
        <InvestmentsTable />
      </div>
    </>
  );
};

export default page;
