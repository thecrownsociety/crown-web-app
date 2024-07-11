/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pf65nwPv5iv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import UserDetailsCard from "./UserDetailsCard";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { userTypes } from "@/lib/types";
import InvestmentsDetailCard from "./InvestmentsDetailCard";

export default function Component() {
  const { data: session } = useSession();

  const getUserDetails = async () => {
    const res = await fetch(`/api/users/${session?.user.id}`);
    const data = await res.json();
    return data;
  };

  const { data, isLoading, isSuccess } = useQuery<userTypes>({
    queryKey: ["users"],
    queryFn: getUserDetails,
    refetchOnReconnect: true,
  });

  return (
    <div className="w-full py-6 space-y-6">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="loader mt-20 ml-40"></div>
        </div>
      ) : (
        <div className="container space-y-4">
          <UserDetailsCard data={data} />
          <InvestmentsDetailCard userId={data?.id} />
        </div>
      )}
    </div>
  );
}
