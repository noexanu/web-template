import { Container } from "inversify";

import { AuthController } from "../controllers/AuthController";
import { PrismaClient } from "../prisma/client";
import { TokenService } from "../services/TokenService";
import { UserService } from "../services/UserService";

const container = new Container();

// injectable
container.bind(TokenService).toSelf();
container.bind(UserService).toSelf();
container.bind(PrismaClient).toSelf();

// not-injectable
container.bind(AuthController).toSelf();

export { container };
