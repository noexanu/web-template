import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { type Router } from "@template/backend";

import { getQueryClientSSR } from "./querySSR.utils";
import { envPrivateConfig } from "../config/envPrivateConfig";

export const trpcSSR = createTRPCOptionsProxy({
  client: createTRPCClient<Router>({
    links: [httpBatchLink({ url: envPrivateConfig.SERVER_BASE_URL })],
  }),
  queryClient: getQueryClientSSR,
});
