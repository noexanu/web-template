import dotenv from "dotenv";
import { z } from "zod";

import { base64 } from "../utils/base64";

dotenv.config();

const DEFAULT_LOGGING_LEVEL = "info";
const DEFAULT_PORT = 4000;

const ENVIRONMENTS = ["production", "development"] as const;

const LOGGING_LEVELS = [
  "fatal",
  "error",
  "warn",
  "info",
  "debug",
  "trace",
  "silent",
] as const;

const AVAILABLE_ALGORITHMS = [
  "HS256",
  "HS384",
  "HS512",
  "RS256",
  "RS384",
  "RS512",
  "ES256",
  "ES384",
  "ES512",
  "PS256",
  "PS384",
  "PS512",
  "none",
] as const;

const envSchema = z.object({
  LOGGING_LEVEL: z.enum(LOGGING_LEVELS).default(DEFAULT_LOGGING_LEVEL),
  PORT: z.coerce.number().default(DEFAULT_PORT),
  ENVIRONMENT: z.enum(ENVIRONMENTS).default("production"),

  ACCESS_TOKEN_TTL_SECONDS: z.coerce.number(),
  ACCESS_TOKEN_ALGORITHM: z.enum(AVAILABLE_ALGORITHMS),
  ACCESS_TOKEN_SECRET: z
    .string()
    .transform((encoded) => base64.decode(encoded)),

  REFRESH_TOKEN_TTL_SECONDS: z.coerce.number(),
  REFRESH_TOKEN_ALGORITHM: z.enum(AVAILABLE_ALGORITHMS),
  REFRESH_TOKEN_SECRET: z
    .string()
    .transform((encoded) => base64.decode(encoded)),

  DATABASE_URL: z.string(),
});

export const envConfig = envSchema.parse(process.env);
