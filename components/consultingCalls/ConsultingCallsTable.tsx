"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { consultingCallType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils/formatDate";

const ConsultingCallsTable = () => {
  const getConsultingCalls = async () => {
    const res = await fetch("/api/consultingCalls?skip=0&take=10");
    const data = await res.json();
    return data.data;
  };

  const { data, isLoading, isSuccess } = useQuery<consultingCallType[]>({
    queryKey: ["consultingCalls"],
    queryFn: getConsultingCalls,
    refetchOnReconnect: true,
  });

  return (
    <Table>
      <TableCaption>A list of Calls completed</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Interviewer</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Doc Link</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && <div className="text-center pt-4">Loading...</div>}
        {isSuccess &&
          data?.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-bold">
                {user.interviewer?.name}
              </TableCell>
              <TableCell>{user.client?.name}</TableCell>
              <TableCell>
                <a href={user.docLink} target="_blank">
                  {user.client?.name} - {formatDate(user.createdAt)}
                </a>
              </TableCell>
              <TableCell>{formatDate(user.createdAt)}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default ConsultingCallsTable;
