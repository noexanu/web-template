import { inject, injectable } from "inversify";

import {
  type CreateUserData,
  type DeleteUserData,
  type GetUserData,
  type UpdateUserData,
} from "./UserService.types";
import { PrismaClient } from "../prisma/client";
import { hashing } from "../utils/hashing";

@injectable()
export class UserService {
  @inject(PrismaClient) private prismaClient!: PrismaClient;

  create = async ({ password, ...userData }: CreateUserData) => {
    if (password) {
      const hashedPassword = await hashing.hash(password);
      const modifiedData = { ...userData, password: hashedPassword };

      return this.prismaClient.user.create({ data: modifiedData });
    }

    return this.prismaClient.user.create({ data: userData });
  };

  read = ({ password: _, ...userData }: GetUserData) => {
    return this.prismaClient.user.findFirstOrThrow({ where: userData });
  };

  update = async ({ uuid, password, ...userData }: UpdateUserData) => {
    if (password) {
      const hashedPassword = await hashing.hash(password);
      const modifiedData = { ...userData, password: hashedPassword };

      return this.prismaClient.user.update({
        data: modifiedData,
        where: { uuid },
      });
    }

    return this.prismaClient.user.update({ data: userData, where: { uuid } });
  };

  delete = ({ uuid }: DeleteUserData) => {
    return this.prismaClient.user.delete({ where: { uuid } });
  };
}
