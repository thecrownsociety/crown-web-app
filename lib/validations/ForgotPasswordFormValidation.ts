import * as z from "zod";

export const ForgotPasswordFormValidation = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: z.string().nonempty("Password is required"),
  confirmPassword: z.string().nonempty("confirmation password cannot be empty"),
});
