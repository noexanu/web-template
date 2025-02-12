import { testRouter } from "./testRouter";
import { trpc } from "../utils/trpc";

export const router = trpc.router({
  ...testRouter,
});

export type Router = typeof router;
