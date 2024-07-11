import {
  TransactionStatus,
  investmentTypeEnum,
  riskTakingCapacityTypes,
} from "@prisma/client";

export type userTypes = {
  id: string;
  name: string;
  email: string;
  password: string | undefined;
  isAdmin: boolean;

  brokerName: string;
  investmentGoal: string;
  phoneNumber: string;
  riskTakingCapacity: riskTakingCapacityTypes;
  investments: investmentType[];
};

export type investmentType = {
  id: string;
  amount: number;
  transactionDate: string;
  transactionType: investmentTypeEnum;
  status: TransactionStatus;
  approvalNote: string;
  rejectionNote: string;
  updatedAt: string;
  client: {
    id: string;
    name: string;
  };
};

export type consultingCallType = {
  id: string;
  client: {
    id: string;
    name: string;
    isAdmin: boolean;
  };
  interviewer: {
    id: string;
    name: string;
    isAdmin: boolean;
  };
  docLink: string;
  createdAt: string;
};

export type queryTrackingType = {
  id: string;
  subject: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  queryStatus: string;
};
