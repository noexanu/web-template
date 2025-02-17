import { cookieConfig } from "../config/cookieConfig";
import { container } from "../config/inversifyConfig";
import { REFRESH_TOKEN_COOKIE_NAME } from "../const/tokens.const";
import { AuthController } from "../controllers/AuthController";
import {
  signinWithEmailAnPasswordSchema,
  signupWithEmailAndPasswordSchema,
} from "../controllers/AuthController.types";
import { refreshMiddleware } from "../middlewares/trpc/refreshMiddleware";
import { trpc } from "../utils/trpc";

const authController = container.get(AuthController);

export const authRouter = {
  signupWithEmailAndPassword: trpc.procedure
    .input(signupWithEmailAndPasswordSchema)
    .mutation(async ({ ctx, input }) => {
      const { accessToken, refreshToken } =
        await authController.signupWithEmailAndPassword(input);

      ctx.res.setCookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, cookieConfig);

      return { accessToken };
    }),

  signinWithEmailAndPassword: trpc.procedure
    .input(signinWithEmailAnPasswordSchema)
    .mutation(async ({ ctx, input }) => {
      const { accessToken, refreshToken } =
        await authController.signinWithEmailAndPassword(input);

      ctx.res.setCookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, cookieConfig);

      return { accessToken };
    }),

  refreshTokens: trpc.procedure
    .use(refreshMiddleware)
    .mutation(async ({ ctx }) => {
      const { accessToken, refreshToken } = await authController.refreshTokens({
        uuid: ctx.uuid,
      });

      ctx.res.setCookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, cookieConfig);

      return { accessToken };
    }),
};
