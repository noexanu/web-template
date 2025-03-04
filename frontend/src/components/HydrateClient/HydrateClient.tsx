import { type FC, type PropsWithChildren } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClientSSR } from "../../utils/querySSR.utils";

export const HydrateClient: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = getQueryClientSSR();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};
