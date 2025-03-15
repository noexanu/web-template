import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email("Email is not correct"),
  password: z
    .string()
    .min(10, "Password must be 10 to 30 characters long")
    .max(30, "Password must be 10 to 30 characters long")
    .regex(/[a-z]/g, "Password must contain lower case letters")
    .regex(/[A-Z]/g, "Password must contain upper case letters")
    .regex(/[\W_]/g, "Password must contain special characters")
    .refine(
      (value) => !/(.)\1{3,}/.test(value),
      "Password must not contain character sequence"
    )
    .refine(
      (value) => !/\s/.test(value),
      "Password must not contain white spaces"
    ),
});
