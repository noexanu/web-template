import { authRouter } from "./authRouter";
import { trpc } from "../utils/trpc";

export const router = trpc.router({
  ...authRouter,
});

export type Router = typeof router;
