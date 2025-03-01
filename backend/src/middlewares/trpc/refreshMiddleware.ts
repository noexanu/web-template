import { TRPCError } from "@trpc/server";

import { container } from "../../config/inversifyConfig";
import {
  AUTH_SCHEME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "../../const/tokens.const";
import { TokenService } from "../../services/TokenService";
import { trpc } from "../../utils/trpc";

const tokenService = container.get(TokenService);

export const refreshMiddleware = trpc.middleware(async ({ ctx, next }) => {
  const cookies = ctx.req.cookies;
  const authorizationCookieContent = cookies[REFRESH_TOKEN_COOKIE_NAME] ?? "";
  const [authScheme, refreshToken] = authorizationCookieContent.split(" ");

  if (authScheme !== AUTH_SCHEME || !refreshToken) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const { uuid } = tokenService.verifyToken(refreshToken, "refresh");

  return next({ ctx: { uuid } });
});
