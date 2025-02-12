import pino from "pino";

import { envConfig } from "../const/envConfig";

export const logger = pino({
  transport: { target: "pino-pretty" },
  level: envConfig.LOGGING_LEVEL,
  serializers: {
    req: ({ headers, url }) => ({ headers, url }),
  },
});
