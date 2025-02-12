import { TestController } from "../controllers/TestController";
import { testSchema } from "../controllers/TestController.types";
import { authMiddleware } from "../middlewares/trpc/authMiddleware";
import { TestService } from "../services/TestService";
import { trpc } from "../utils/trpc";

const testService = new TestService();
const testController = new TestController(testService);

export const testRouter = {
  test: trpc.procedure
    .use(authMiddleware)
    .input(testSchema)
    .query(async ({ input }) => {
      const response = await testController.test(input);

      return response;
    }),
};
