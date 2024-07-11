"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { data: session } = useSession();

  return (
    <>
      <div
        style={{
          marginTop: "-100px",
        }}
        className="flex flex-col justify-center items-center h-screen"
      >
        <div className="flex ">
          <div className=" text-6xl">
            Welcome to the Crown, {session?.user.name}
          </div>
        </div>
        <div className="flex mt-8">
          <Link href={`/Profile/${session?.user.id}`}>
            <Button className="text-2xl p-4">Go to Profile</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;
