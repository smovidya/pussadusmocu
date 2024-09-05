import { type PrismaClient } from "@prisma/client";
import { type DefaultArgs } from "@prisma/client/runtime/library";

export type Ctx = {
  headers: Headers;
  db: PrismaClient<
    {
      log: ("query" | "warn" | "error")[];
    },
    never,
    DefaultArgs
  >;
};
