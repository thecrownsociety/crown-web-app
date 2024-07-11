import React from "react";
import { formatDate, formatTime } from "@/lib/utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import { queryTrackingType } from "@/lib/types";

interface UserQueriesTableProps {
  userId: string | undefined;
}

const UserQueriesTable: React.FC<UserQueriesTableProps> = ({ userId }) => {
  const getQueries = async () => {
    const res = await fetch(`/api/QueryTracking/${userId}`);
    const data = await res.json();
    return data;
  };

  const { data, isLoading, isSuccess, refetch } = useQuery<queryTrackingType[]>(
    {
      queryKey: ["query"],
      queryFn: getQueries,
      refetchOnReconnect: true,
    }
  );

  return (
    <>
      <div className="overflow-auto">
        <table className="min-w-full w-full mt-4">
          <thead>
            <tr className="border-t border-gray-200 dark:border-gray-800">
              <th>Sl.No</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Created Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {data &&
              data?.map((query, index) => (
                <tr key={query.id} className="bg-gray-50 dark:bg-gray-800">
                  <td className="px-4 py-3 text-sm">{index+1}</td>
                  <td className="px-4 py-3 text-sm">{query.subject}</td>
                  <td className="px-4 py-3 text-sm">{query.queryStatus}</td>
                  <td className="px-4 py-3 text-sm">
                    {formatDate(query.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {formatTime(query.createdAt)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserQueriesTable;
