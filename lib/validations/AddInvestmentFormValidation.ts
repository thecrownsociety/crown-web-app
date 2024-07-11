import * as z from "zod";

export const AddInvestmentFormValidation = z.object({
  amount: z.number().min(1),
  transactionType: z.string().nonempty("transactionType cannot be empty"),
});
