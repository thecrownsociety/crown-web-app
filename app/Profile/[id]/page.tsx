"use client";
import ProfileLayout from "@/components/Profile/UserProfileLayout";
import { useSession } from "next-auth/react";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const { id } = params;
  return (
    <>
      <div>
        Welcome to the Crown, {session?.user.name} with Client id as {id}
      </div>
      <ProfileLayout />
    </>
  );
};

export default Page;
