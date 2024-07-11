import { z } from "zod";

export const contactHelpValidation = z.object({
  name: z.string().nonempty("name is required"),
  email: z.string().email("invalid email address"),
  subject: z.string().nonempty("subject is required"),
  message: z.string().min(1),
});
