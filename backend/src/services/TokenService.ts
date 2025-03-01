import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";

import {
  type GenerationMode,
  type TokenPayload,
  type TokenType,
} from "./TokenService.types";
import {
  ACCESS_TOKEN_CONFIG,
  AUTH_SCHEME,
  REFRESH_TOKEN_CONFIG,
} from "../const/tokens.const";
import { PrismaClient, User } from "../prisma/client";

@injectable()
export class TokenService {
  @inject(PrismaClient) private prismaClient!: PrismaClient;

  private getConfigByTokenType = (tokenType: TokenType) =>
    tokenType === "access" ? ACCESS_TOKEN_CONFIG : REFRESH_TOKEN_CONFIG;

  verifyToken = (token: string, tokenType: TokenType) => {
    const [algorithm, secret] = this.getConfigByTokenType(tokenType);

    return jwt.verify(token, secret, {
      algorithms: [algorithm],
    }) as TokenPayload;
  };

  generateToken = (payload: TokenPayload, tokenType: TokenType) => {
    const [algorithm, secret, expiresIn] = this.getConfigByTokenType(tokenType);
    const generatedToken = jwt.sign(payload, secret, { algorithm, expiresIn });

    return `${AUTH_SCHEME} ${generatedToken}`;
  };

  generateTokenPair = async ({ uuid }: User, mode: GenerationMode) => {
    const tokenPayload: TokenPayload = { uuid };

    const accessToken = this.generateToken(tokenPayload, "access");
    const refreshToken = this.generateToken(tokenPayload, "refresh");

    await this.prismaClient.user.update({
      data: { refreshToken: { [mode]: { token: refreshToken } } },
      where: { uuid },
    });

    return { accessToken, refreshToken };
  };
}
