import React from "react";
import AddInvestmentsModal from "../Investments/AddInvestmentsModal";
import { investmentType } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/utils/formatDate";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

interface UserInvestmentsTableProps {
  userId: string | undefined;
  data: investmentType[] | undefined;
}

const UserInvestmentsTable: React.FC<UserInvestmentsTableProps> = ({
  data,
  userId,
}) => {
  return (
    <>
      <div className="flex justify-end">
        <AddInvestmentsModal id={userId} />
      </div>
      <div className="overflow-auto">
        <table className="min-w-full w-full">
          <thead>
            <tr className="border-t border-gray-200 dark:border-gray-800">
              <th>Order placed at Date</th>
              <th>Order placed at Time</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Approved/Rejected At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {data &&
              data?.map((investment) => (
                <tr key={investment.id} className="bg-gray-50 dark:bg-gray-800">
                  <td className="px-4 py-3 text-sm">
                    {formatDate(investment.transactionDate)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {formatTime(investment.transactionDate)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {investment.transactionType}
                  </td>
                  <td className="px-4 py-3 text-sm">{investment.amount}</td>
                  <td className="px-4 py-3 text-sm">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          // className="text-white bg-green-600 mr-2 border-none"
                          variant="outline"
                        >
                          {investment.status}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        {investment.approvalNote
                          ? investment.approvalNote
                          : investment.rejectionNote}
                      </PopoverContent>
                    </Popover>
                  </td>
                  {investment.updatedAt ? (
                    <td className="px-4 py-3 text-sm">
                      {formatDate(investment.updatedAt) +
                        " - " +
                        formatTime(investment.updatedAt)}
                    </td>
                  ) : (
                    <td className="px-4 py-3 text-sm">-</td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserInvestmentsTable;
