import { z } from "zod";

export const signupWithEmailAndPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export const signinWithEmailAnPasswordSchema = signupWithEmailAndPasswordSchema;

export type SignupWithEmailAndPasswordData = z.output<
  typeof signupWithEmailAndPasswordSchema
>;
export type SigninWithEmailAndPasswordData = z.output<
  typeof signinWithEmailAnPasswordSchema
>;

export const refreshTokensSchema = z.object({
  uuid: z.string(),
});

export type RefreshTokensData = z.output<typeof refreshTokensSchema>;
