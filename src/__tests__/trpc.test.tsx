import { expect, it } from "vitest";

import { createTRPCContext } from "~/server/api/trpc";
import { type NextRequest } from "next/server";
import { type RouterInputs } from "~/trpc/react";
import { appRouter } from "~/server/api/root";

it("unauthed user should not be possible to create a post", async (req: NextRequest) => {
  const ctx = await createTRPCContext({
    headers: req.headers,
  });
  const caller = appRouter.createCaller(ctx);

  const input: RouterInputs["post"]["create"] = {
    name: "hello test",
  };

  await expect(caller.post.create(input)).rejects.toThrowError();
});
