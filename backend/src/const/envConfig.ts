import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const DEFAULT_LOGGING_LEVEL = "info";
const DEFAULT_PORT = 4000;

const envSchema = z.object({
  LOGGING_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default(DEFAULT_LOGGING_LEVEL),
  PORT: z.coerce.number().default(DEFAULT_PORT),
});

export const envConfig = envSchema.parse(process.env);
