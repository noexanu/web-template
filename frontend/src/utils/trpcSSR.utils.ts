import { createTRPCClient, httpBatchLink } from "@trpc/client";
// https://github.com/trpc/trpc/issues/6595
// eslint-disable-next-line import/no-unresolved
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query/create-options-proxy";
import { headers as getHeaders } from "next/headers";
import { type Router } from "@template/backend";

import { getQueryClientSSR } from "./querySSR.utils";
import { fetchData, type RefreshTokenResponseData } from "./trpc.utils";
import { envPrivateConfig } from "../config/envPrivateConfig";

export const refreshTokens = async (cookie: string) => {
  const response = await fetch(
    `${envPrivateConfig.SERVER_BASE_URL}/refreshTokens`,
    {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json", cookie },
    }
  );

  const responseData = (await response.json()) as RefreshTokenResponseData;
  const accessToken = responseData.result?.data?.accessToken;
  const setCookieHeader = response.headers.get("set-cookie");

  return { accessToken, setCookieHeader };
};

export const trpcSSR = createTRPCOptionsProxy({
  client: createTRPCClient<Router>({
    links: [
      httpBatchLink({
        url: envPrivateConfig.SERVER_BASE_URL,
        fetch: async (url, options) => {
          const headers = await getHeaders();
          const accessToken = headers.get("authorization");

          return fetchData(url, options, accessToken);
        },
      }),
    ],
  }),
  queryClient: getQueryClientSSR,
});
