import { authRouter } from "./authRouter";
import { testRouter } from "./testRouter";
import { trpc } from "../utils/trpc";

export const router = trpc.router({
  ...authRouter,
  ...testRouter,
});

export type Router = typeof router;
