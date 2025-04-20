import { envPublicConfig } from "../config/envPublicConfig";

export type RefreshTokenResponseData = {
  result?: { data?: { accessToken?: string } };
};

export const refreshTokens = async () => {
  const response = await fetch(
    `${envPublicConfig.NEXT_PUBLIC_SERVER_BASE_URL}/refreshTokens`,
    {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
    },
  );

  const responseData = (await response.json()) as RefreshTokenResponseData;

  return responseData.result?.data?.accessToken;
};

export const fetchData = (
  url: URL | RequestInfo,
  options: RequestInit | undefined,
  accessToken?: string | null,
) => {
  const headers = {
    ...(options?.headers as Record<string, string>),
    ...(!!accessToken && { authorization: accessToken }),
  };

  return fetch(url, { ...options, headers, credentials: "include" });
};
