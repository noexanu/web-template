import argon2 from "argon2";

export const hashing = {
  hash: (data: string) => argon2.hash(data),
  verify: (hash: string, data: string) => argon2.verify(hash, data),
};
