import { redirect } from "next/navigation";

import { envPublicConfig } from "../config/envPublicConfig";
import { ROUTES } from "../const/routes.const";

export const refreshTokens = async (): Promise<string> => {
  const response = await fetch(
    `${envPublicConfig.NEXT_PUBLIC_SERVER_BASE_URL}/refreshTokens`,
    {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
    }
  );

  const responseData = await response.json();
  const accessToken = responseData?.result?.data?.accessToken;

  if (!accessToken) {
    redirect(ROUTES.signin);
  }

  return accessToken;
};

export const fetchData = (
  url: URL | RequestInfo,
  options: RequestInit | undefined,
  accessToken: string
) =>
  fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...options?.headers,
      authorization: accessToken,
    },
  });
