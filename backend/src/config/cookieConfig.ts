import { type CookieSerializeOptions } from "@fastify/cookie";

export const cookieConfig: CookieSerializeOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  path: "/",
};
