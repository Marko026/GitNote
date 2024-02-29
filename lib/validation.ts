import * as z from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(4, "Please enter a valid value")
    .optional()
    .or(z.literal("")),
  email: z.string().email(),
  password: z.string().min(6),
});
