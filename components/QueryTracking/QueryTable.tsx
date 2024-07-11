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
} from "../../components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { queryTrackingType } from "../../lib/types";
import { formatDate } from "../../lib/utils/formatDate";

const QueryTable = () => {
  const getQueries = async () => {
    const res = await fetch("/api/QueryTracking");
    const data = await res.json();
    return data;
  };

  const { data, isLoading, isSuccess, refetch } = useQuery<queryTrackingType[]>(
    {
      queryKey: ["query"],
      queryFn: getQueries,
      refetchOnMount: true,
    }
  );

  return (
    <Table>
      <TableCaption>A list of Queries</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Created By</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && <div className="text-center pt-4">Loading...</div>}
        {isSuccess &&
          data?.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-bold">
                {user.createdBy?.name}
              </TableCell>
              <TableCell>{user.subject}</TableCell>
              <TableCell>{user.queryStatus}</TableCell>
              <TableCell>{formatDate(user.createdAt)}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default QueryTable;
