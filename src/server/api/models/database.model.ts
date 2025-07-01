import { type PrismaClient } from "@prisma/client";
import { type DefaultArgs } from "@prisma/client/runtime/library";
import { type NextRequest } from "next/server";

export type Ctx = {
  headers: Headers;
  request: NextRequest;
  db: PrismaClient<
    {
      log: ("query" | "warn" | "error")[];
    },
    never,
    DefaultArgs
  >;
};
