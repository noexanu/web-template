import { TRPCError } from "@trpc/server";

import { container } from "../../config/inversifyConfig";
import { AUTH_SCHEME } from "../../const/tokens.const";
import { TokenService } from "../../services/TokenService";
import { trpc } from "../../utils/trpc";

const tokenService = container.get(TokenService);

export const authMiddleware = trpc.middleware(async ({ ctx, next }) => {
  const authorizationHeaderContent = ctx.req.headers.authorization ?? "";
  const [authScheme, accessToken] = authorizationHeaderContent.split(" ");

  if (authScheme !== AUTH_SCHEME || !accessToken) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  try {
    const { uuid } = tokenService.verifyToken(accessToken, "access");
    return await next({ ctx: { uuid } });
  } catch {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
});
