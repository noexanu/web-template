import { initTRPC } from "@trpc/server";
import { type CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

import { PRISMA_ERROR_TO_STATUS_CODE_MAP } from "../const/logger.const";

export const createContext = (options: CreateFastifyContextOptions) => options;
export const trpc = initTRPC
  .context<Awaited<ReturnType<typeof createContext>>>()
  .create({
    errorFormatter({ shape, error }) {
      const isPrismaError = error.cause && "code" in error.cause;

      if (isPrismaError) {
        const message = error.message.split("\n").at(-1);
        const code = error.cause.code as string;
        const httpStatus =
          PRISMA_ERROR_TO_STATUS_CODE_MAP[code] ?? shape.data.httpStatus;

        return { ...shape, message, code, data: { httpStatus } };
      }

      return {
        ...shape,
        message: error.message,
        data: { httpStatus: shape.data.httpStatus },
      };
    },
  });
