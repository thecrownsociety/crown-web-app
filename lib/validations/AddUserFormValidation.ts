import * as z from "zod";

export const AddUserFormValidation = z.object({
  name: z.string().nonempty("name must not be empty"),
  email: z.string().nonempty("email must not be empty").email("invalid email"),
  password: z.string().nonempty("password must not be empty"),
  isAdmin: z.boolean(),
});
