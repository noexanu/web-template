"use client";

import { type FC, type PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { type Router } from "@template/backend";

import { useTrpcClient } from "./useTrpcClient";
import { getQueryClient } from "../../utils/query.utils";

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<Router>();

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();
  const trpcClient = useTrpcClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
};
