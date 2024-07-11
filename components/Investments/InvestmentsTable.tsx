"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { investmentType } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/utils/formatDate";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";
import toast from "react-hot-toast";

const InvestmentsTable = () => {
  const [approvalNote, setApprovalNote] = useState("");
  const [rejectionNote, setRejectionNote] = useState("");
  const [Loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const getInvestments = async () => {
    const res = await fetch("/api/investments?skip=0&take=10");
    const data = await res.json();
    // console.log("data", data);
    return data.data;
  };

  const {
    data: investmentData,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery<investmentType[]>({
    queryKey: ["investments"],
    queryFn: getInvestments,
    refetchOnReconnect: true,
  });

  const approveInvestment = async (id: string) => {
    try {
      setLoading(true);
      const res = await fetch("/api/investments/approve", {
        method: "PUT",
        body: JSON.stringify({
          approvalNote,
          investmentId: id,
        }),
      });

      if (res.status === 200) {
        toast.success("Investment successfully approved");
      } else {
        toast.success("Failed to approve! Please try again");
      }

      queryClient.invalidateQueries({ queryKey: ["investments"] });
    } catch (error) {
      console.log(error);
      toast.error("something went wrong! try again");
    } finally {
      setApprovalNote("");
      setLoading(false);
    }
  };

  const rejectInvestment = async (id: string) => {
    try {
      setLoading(true);
      const res = await fetch("/api/investments/reject", {
        method: "PUT",
        body: JSON.stringify({
          rejectionNote,
          investmentId: id,
        }),
      });

      if (res.status === 200) {
        toast.success("Investment successfully rejected");
      } else {
        toast.success("Failed to reject! Please try again");
      }

      queryClient.invalidateQueries({ queryKey: ["investments"] });
    } catch (error) {
      console.log(error);
      toast.error("something went wrong! try again");
    } finally {
      setRejectionNote("");
      setLoading(false);
    }
  };

  return (
    <Table>
      <TableCaption>A list of Investments</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && <div className="text-center pt-4">Loading...</div>}
        {isSuccess &&
          investmentData?.map((investment) => (
            <TableRow key={investment.id}>
              <TableCell className="font-bold">
                {investment.client?.name}
              </TableCell>
              <TableCell>{formatDate(investment.transactionDate)}</TableCell>
              <TableCell>{formatTime(investment.transactionDate)}</TableCell>
              <TableCell>{investment.transactionType}</TableCell>
              <TableCell>{investment.amount}</TableCell>
              <TableCell>{investment.status}</TableCell>
              <TableCell>
                {investment.status === "pending" && (
                  <div className="flex">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className="text-white bg-green-600 mr-2 border-none"
                          variant="outline"
                        >
                          Approve
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <Input
                            type="text"
                            placeholder="approval note"
                            value={approvalNote}
                            onChange={(e) => setApprovalNote(e.target.value)}
                          />
                        </div>

                        <Button
                          onClick={() => approveInvestment(investment.id)}
                          className={`${Loading && "loader"} mt-2`}
                        >
                          Submit
                        </Button>
                      </PopoverContent>
                    </Popover>

                    {/* rejection popover */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className="text-white bg-red-600 mr-2 border-none"
                          variant="outline"
                        >
                          Reject
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <Input
                            type="text"
                            placeholder="rejection note"
                            value={rejectionNote}
                            onChange={(e) => setRejectionNote(e.target.value)}
                          />
                        </div>
                        <Button
                          className={`${Loading && "loader"} mt-2`}
                          onClick={() => rejectInvestment(investment.id)}
                        >
                          Submit
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default InvestmentsTable;
