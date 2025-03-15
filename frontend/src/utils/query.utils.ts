import { QueryClient } from "@tanstack/react-query";

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });

const browserQueryClient = createQueryClient();

export const getQueryClient = () =>
  (globalThis.window as Window | undefined) === undefined
    ? // Server: always make a new query client
      createQueryClient()
    : /*
        Browser: make a new query client if we don't already have one
        This is very important, so we don't re-make a new client if React
        suspends during the initial render. This may not be needed if we
        have a suspense boundary BELOW the creation of the query client
      */
      browserQueryClient;
