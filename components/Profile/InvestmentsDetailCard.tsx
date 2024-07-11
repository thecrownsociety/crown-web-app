import React from "react";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { investmentType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserInvestmentsTable from "./UserInvestmentsTable";
import UserQueriesTable from "./UserQueriesTable";

const InvestmentsDetailCard = ({ userId }: { userId: string | undefined }) => {
  const getUserInvestments = async () => {
    const res = await fetch(`/api/investments/${userId}`);
    const data = await res.json();
    return data;
  };

  const { data, isLoading, isSuccess, refetch } = useQuery<investmentType[]>({
    queryKey: ["investments"],
    queryFn: getUserInvestments,
    refetchOnReconnect: true,
  });

  return (
    <Card>
      <CardHeader>
        <Tabs defaultValue="investments" className="w-full">
          <TabsList>
            <TabsTrigger className="text-xl font-bold" value="investments">
              Investments
            </TabsTrigger>
            <TabsTrigger className="text-xl font-bold" value="queries">
              Queries
            </TabsTrigger>
          </TabsList>
          <TabsContent value="investments">
            <UserInvestmentsTable userId={userId} data={data} />
          </TabsContent>
          <TabsContent value="queries">
            <UserQueriesTable userId={userId} />
          </TabsContent>
        </Tabs>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default InvestmentsDetailCard;
