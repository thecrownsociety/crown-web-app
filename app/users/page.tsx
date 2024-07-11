"use client";
import Navbar from "@/components/Navbar";
import AddUserModal from "@/components/Users/AddUserModal";
import UsersTable from "@/components/Users/UsersTable";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useLayoutEffect } from "react";
import toast from "react-hot-toast";

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
      <div className="flex justify-end pr-8  md:pr-28 mt-16">
        <AddUserModal />
      </div>

      <div className=" flex justify-center pl-4 pr-4 items-center md:pl-32 md:pr-32 md:mt-10">
        <UsersTable />
      </div>
    </>
  );
};

export default page;
