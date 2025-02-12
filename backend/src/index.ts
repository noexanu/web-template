import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import {
  fastifyTRPCPlugin,
  type FastifyTRPCPluginOptions,
} from "@trpc/server/adapters/fastify";
import Fastify from "fastify";
import { v7 } from "uuid";

import { envConfig } from "./const/envConfig";
import { type Router, router } from "./routers/router";
import { logger } from "./utils/logger";
import { createContext } from "./utils/trpc";

export { type Router };

const server = Fastify({
  genReqId: () => v7(),
  loggerInstance: logger,
});

server.register(cors);
server.register(helmet);
server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router,
    createContext,
    onError: ({ error }) => logger.error(error.message),
  } satisfies FastifyTRPCPluginOptions<Router>["trpcOptions"],
});

server.listen({ port: envConfig.PORT }, (error) => {
  if (!error) {
    logger.info(`Server running on port: ${envConfig.PORT}`);
  } else {
    logger.info(`Server run failed: ${error.message}`);
    process.exit(1);
  }
});
