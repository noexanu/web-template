import pino from "pino";

import { envConfig } from "../config/envConfig";

export const logger = pino({
  transport: { target: "pino-pretty" },
  level: envConfig.LOGGING_LEVEL,
});
