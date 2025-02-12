import { initTRPC } from "@trpc/server";
import { type CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

export const createContext = (options: CreateFastifyContextOptions) => options;
export const trpc = initTRPC
  .context<Awaited<ReturnType<typeof createContext>>>()
  .create();
