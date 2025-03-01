import { type FastifyCorsOptions } from "@fastify/cors";

import { envConfig } from "./envConfig";

const corsDevConfig: FastifyCorsOptions = {
  origin: "http://localhost:3000",
  // allow cross-origin cookies for local development
  credentials: true,
};

const corsProdConfig: FastifyCorsOptions = {};

export const corsConfig =
  envConfig.ENVIRONMENT === "development" ? corsDevConfig : corsProdConfig;
