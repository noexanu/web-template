import { z } from "zod";

const DEFAULT_LOGGING_LEVEL = "info";
const DEFAULT_PORT = 3000;

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

const envPrivateSchema = z.object({
  LOGGING_LEVEL: z.enum(LOGGING_LEVELS).default(DEFAULT_LOGGING_LEVEL),
  PORT: z.coerce.number().default(DEFAULT_PORT),
  ENVIRONMENT: z.enum(ENVIRONMENTS).default("production"),
  SERVER_BASE_URL: z.string(),
});

export const envPrivateConfig = envPrivateSchema.parse(process.env);
