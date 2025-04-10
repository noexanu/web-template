import { useMemo } from "react";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { useRouter } from "next/navigation";
import { type Router } from "@template/backend";

import { envPublicConfig } from "../../config/envPublicConfig";
import { ROUTES } from "../../const/routes.const";
import { useAuthStore } from "../../stores/authStore";
import { fetchData, refreshTokens } from "../../utils/trpc.utils";

export const useTrpcClient = () => {
  const accessToken = useAuthStore((state) => state.accessToken) ?? "";
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const router = useRouter();

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

              if (!newAccessToken) {
                router.push(ROUTES.signin);

                return response;
              }

              setAccessToken(newAccessToken);

              return fetchData(url, options, newAccessToken);
            },
          }),
        ],
      }),

    [router, accessToken, setAccessToken]
  );
};
