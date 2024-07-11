/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FA7v3GPzcZf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <section className="w-full py-12 md:py-24 h-full">
        <div className=" container px-4 md:px-6 mt-32">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Welcome To Crown
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Experience Financial Royalty
              </p>
            </div>
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md border  bg-black px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-amber-300 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="/Login"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
