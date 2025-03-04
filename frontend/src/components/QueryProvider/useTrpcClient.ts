import { useMemo } from "react";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { type Router } from "@template/backend";

import { envPublicConfig } from "../../config/envPublicConfig";
import { useAuthStore } from "../../stores/authStore";
import { fetchData, refreshTokens } from "../../utils/trpc.utils";

export const useTrpcClient = () => {
  const accessToken = useAuthStore((state) => state.accessToken) ?? "";
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMemo(
    () =>
      createTRPCClient<Router>({
        links: [
          httpBatchLink({
            url: envPublicConfig.NEXT_PUBLIC_SERVER_BASE_URL,
            fetch: async (url, options) => {
              const response = await fetchData(url, options, accessToken);

              if (response.status !== 401) {
                return response;
              }

              const newAccessToken = await refreshTokens();

              setAccessToken(newAccessToken);

              return fetchData(url, options, newAccessToken);
            },
          }),
        ],
      }),

    [accessToken, setAccessToken]
  );
};
