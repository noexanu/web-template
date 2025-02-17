import { type User as PrismaUser } from "../prisma/client";

type PickNullable<T> = {
  [P in keyof T as null extends T[P] ? P : never]: T[P];
};

type PickNotNullable<T> = {
  [P in keyof T as null extends T[P] ? never : P]: T[P];
};

type OptionalNullable<T> = {
  [K in keyof PickNullable<T>]?: Exclude<T[K], null>;
} & {
  [K in keyof PickNotNullable<T>]: T[K];
};

type User = OptionalNullable<PrismaUser>;

export type CreateUserData = Omit<User, "uuid" | "createdAt">;
export type GetUserData = Partial<User>;
export type UpdateUserData = Omit<User, "createdAt">;
export type DeleteUserData = Pick<User, "uuid">;
