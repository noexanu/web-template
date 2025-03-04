import { authMiddleware } from "../middlewares/trpc/authMiddleware";
import { trpc } from "../utils/trpc";

export const testRouter = {
  test: trpc.procedure.query(() => "data"),
  testProtected: trpc.procedure.use(authMiddleware).query(() => "data"),
};
