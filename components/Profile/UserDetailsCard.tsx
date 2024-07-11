import React from "react";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import EditUserDetailsModal from "./EditUserDetailsModal";
import { userTypes } from "@/lib/types";

const UserDetailsCard = ({ data }: { data: userTypes | undefined }) => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold">Profile</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-end">
          <EditUserDetailsModal data={data} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <div className="font-medium">{data?.name}</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="font-medium">{data?.email}</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="font-medium">{data?.phoneNumber}</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Broker Name</Label>
            <div className="font-medium">{data?.brokerName}</div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Total Investments</Label>
            <div className="font-medium">
              {data?.investments.reduce(
                (acc, investment) => acc + investment.amount,
                0
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Risk Taking Capacity</Label>
            <div className="font-medium">{data?.riskTakingCapacity}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDetailsCard;
