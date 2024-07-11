import * as z from "zod";

export const AddUserDetailFormValidation = z.object({
  brokerName: z.string(),
  phoneNumber: z.string(),
  investmentGoal: z.number(),
  riskTakingCapacity: z.string(),
});
