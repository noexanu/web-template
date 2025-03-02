import pino from "pino";

import { envConfig } from "../config/envConfig";
import { REDACTION_CENSOR, REDACTION_PATHS } from "../const/logger.const";

export const logger = pino({
  transport: { target: "pino-pretty" },
  level: envConfig.LOGGING_LEVEL,
  serializers: {
    req: ({ headers, url }) => ({ headers, url }),
  },
  redact: {
    paths: REDACTION_PATHS,
    censor: REDACTION_CENSOR,
  },
});
