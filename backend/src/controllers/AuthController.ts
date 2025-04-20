import { TRPCError } from "@trpc/server";
import { inject } from "inversify";

import {
  RefreshTokensData,
  type SigninWithEmailAndPasswordData,
  type SignupWithEmailAndPasswordData,
} from "./AuthController.types";
import { TokenService } from "../services/TokenService";
import { UserService } from "../services/UserService";
import { hashing } from "../utils/hashing";

export class AuthController {
  @inject(UserService) private userService!: UserService;
  @inject(TokenService) private tokenService!: TokenService;

  signupWithEmailAndPassword = async (
    payload: SignupWithEmailAndPasswordData,
  ) => {
    const user = await this.userService.create(payload);
    return this.tokenService.generateTokenPair(user, "create");
  };

  signinWithEmailAndPassword = async (
    payload: SigninWithEmailAndPasswordData,
  ) => {
    const user = await this.userService.read(payload);

    if (user.password) {
      const isValidPassword = await hashing.verify(
        user.password,
        payload.password,
      );

      if (isValidPassword) {
        return this.tokenService.generateTokenPair(user, "update");
      }
    }

    throw new TRPCError({ code: "UNAUTHORIZED" });
  };

  refreshTokens = async ({ uuid }: RefreshTokensData) => {
    const user = await this.userService.read({ uuid });
    return this.tokenService.generateTokenPair(user, "update");
  };
}
