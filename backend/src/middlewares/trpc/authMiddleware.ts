import { TRPCError } from "@trpc/server";

import { trpc } from "../../utils/trpc";

const AUTH_SCHEME = "Bearer";

export const authMiddleware = trpc.middleware(async ({ ctx, next }) => {
  const authorizationHeaderContent = ctx.req.headers.authorization ?? "";
  const [authScheme, accessToken] = authorizationHeaderContent.split(" ");

  if (authScheme !== AUTH_SCHEME || !accessToken) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const accessTokenPayload = await Promise.resolve("accessTokenPayload");

  return next({ ctx: { accessTokenPayload } });
});
