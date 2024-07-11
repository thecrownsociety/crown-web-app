import * as z from "zod";

export const AddConsultingCallsSchema = z.object({
  interviewerId: z.string(),
  clientId: z.string(),
  docLink: z.string(),
});
