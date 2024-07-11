/**
 * v0 by Vercel.
 * @see https://v0.dev/t/uRQHBoAnhAU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import crown from "@/public/CROWN.png";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data } = useSession();

  const handleLogOut = async () => {
    await signOut();
    window.location.replace("/");
  };
  return (
    <header className=" bg-black  border-gray-200/50 shadow-sm dark:bg-gray-950 dark:border-gray-950/50 dark:shadow dark:border-gray-950">
      <div>
        <nav className="flex h-24 items-center">
          <Link className="flex items-center font-semibold" href="/">
            <Image src={crown} alt="crown image" height={100} width={150} />
          </Link>
          <div className="flex-1" />

          <div className="md:flex">
            {data?.user && data?.user.isAdmin && (
              <>
                <Link
                  className="font-medium text-amber-300 inline-flex h-9 items-center justify-center px-4 rounded-md text-sm transition-colors hover:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                  href="/users"
                >
                  Users
                </Link>
                <Link
                  className="font-medium text-amber-300 inline-flex h-9 items-center justify-center px-4 rounded-md text-sm transition-colors hover:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                  href="/investments"
                >
                  Investments
                </Link>
                <Link
                  className="font-medium text-amber-300 inline-flex h-9 items-center justify-center px-4 rounded-md text-sm transition-colors hover:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                  href="/consultingCalls"
                >
                  Consulting Calls
                </Link>
                <Link
                  className="font-medium text-amber-300 inline-flex h-9 items-center justify-center px-4 rounded-md text-sm transition-colors hover:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                  href="/QueryTracking"
                >
                  Query Tracker
                </Link>
              </>
            )}

            {data?.user && !data?.user.isAdmin && (
              <>
                <Link
                  className="font-medium text-amber-300 inline-flex h-9 items-center justify-center px-4 rounded-md text-sm transition-colors hover:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                  href={`/Profile/${data.user.id}`}
                >
                  Profile
                </Link>

                <Link
                  className="font-medium text-amber-300 inline-flex h-9 items-center justify-center px-4 rounded-md text-sm transition-colors hover:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                  href="/Help"
                >
                  Help
                </Link>
                <Link
                  className="font-medium text-amber-300 inline-flex h-9 items-center justify-center px-4 rounded-md text-sm transition-colors hover:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                  href="/Forecast"
                >
                  Forecast
                </Link>
              </>
            )}
            {data?.user && <Button onClick={handleLogOut}>Log out</Button>}
          </div>
        </nav>
      </div>
    </header>
  );
}

function ChevronRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
