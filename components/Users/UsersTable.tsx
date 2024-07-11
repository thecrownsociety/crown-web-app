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
import { useQuery } from "@tanstack/react-query";
import { userTypes } from "@/lib/types";

const UsersTable = () => {
  const getUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    return data;
  };

  const { data, isLoading, isSuccess, refetch } = useQuery<userTypes[]>({
    queryKey: ["users"],
    queryFn: getUsers,
    refetchOnReconnect: true,
  });

  return (
    <Table>
      <TableCaption>A list of Users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Admin</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && <div className="text-center pt-4">Loading...</div>}
        {isSuccess &&
          data?.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-bold">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.isAdmin ? "YES" : "NO"}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
