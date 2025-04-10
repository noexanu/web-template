import { type NextRequest, NextResponse } from "next/server";

import { ROUTES } from "./const/routes.const";
import { refreshTokens } from "./utils/trpcSSR.utils";

export async function middleware({ url, headers }: NextRequest) {
  const cookies = headers.get("cookie");

  if (cookies && cookies.includes("refresh")) {
    const { accessToken, setCookieHeader } = await refreshTokens(cookies);

    if (accessToken && setCookieHeader) {
      const nextHeaders = new Headers({
        // eslint-disable-next-line @typescript-eslint/no-misused-spread
        ...headers,
        authorization: accessToken,
      });

      const response = NextResponse.next({ request: { headers: nextHeaders } });

      response.headers.append("set-cookie", setCookieHeader);

      return response;
    }
  }

  return NextResponse.redirect(new URL(ROUTES.signin, url));
}

/*
  The matcher values need to be constants so they can be statically
  analyzed at build-time. Dynamic values such as variables will be ignored

  Matchers array should be fulfilled with SSR protected routes
*/
export const config = { matcher: ["/"] };
