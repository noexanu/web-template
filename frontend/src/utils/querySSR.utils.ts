import { cache } from "react";
import {
  type ResolverDef,
  type TRPCInfiniteQueryOptions,
  type TRPCQueryOptions,
} from "@trpc/tanstack-react-query";

import { getQueryClient } from "./query.utils";

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClientSSR = cache(getQueryClient);

export const prefetchQuery = <
  T extends TRPCQueryOptions<K> | TRPCInfiniteQueryOptions<K>,
  K extends ResolverDef,
>(
  queryOptions: ReturnType<T>
) => {
  const queryClient = getQueryClientSSR();

  if (queryOptions.queryKey[1]?.type === "infinite") {
    return queryClient.prefetchInfiniteQuery(
      queryOptions as ReturnType<TRPCInfiniteQueryOptions<K>>
    );
  }

  return queryClient.prefetchQuery(
    queryOptions as ReturnType<TRPCQueryOptions<K>>
  );
};
