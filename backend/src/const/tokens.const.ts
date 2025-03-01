import { envConfig } from "../config/envConfig";

export const AUTH_SCHEME = "Bearer";
export const REFRESH_TOKEN_COOKIE_NAME = "refresh";

export const ACCESS_TOKEN_CONFIG = [
  envConfig.ACCESS_TOKEN_ALGORITHM,
  envConfig.ACCESS_TOKEN_SECRET,
  envConfig.ACCESS_TOKEN_TTL_SECONDS,
] as const;

export const REFRESH_TOKEN_CONFIG = [
  envConfig.REFRESH_TOKEN_ALGORITHM,
  envConfig.REFRESH_TOKEN_SECRET,
  envConfig.REFRESH_TOKEN_TTL_SECONDS,
] as const;
