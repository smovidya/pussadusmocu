import { expect, test } from "vitest";
import { encrypt } from "~/lib/function";

test("encoding", async () => {
  expect(
    await encrypt({
      student_id: "testetsttest",
      name: "testetstets",
      email: "testetst@test.test",
      line_id: "testtest",
      department: "TEST",
      isAdmin: true,
      exp: 1719415224,
      iat: 1719328824,
      nbf: 1719328824,
    }),
  ).toBe(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoidGVzdGV0c3R0ZXN0IiwibmFtZSI6InRlc3RldHN0ZXRzIiwiZW1haWwiOiJ0ZXN0ZXRzdEB0ZXN0LnRlc3QiLCJsaW5lX2lkIjoidGVzdHRlc3QiLCJkZXBhcnRtZW50IjoiVEVTVCIsImlzQWRtaW4iOnRydWUsImV4cCI6MTcxOTQxNTIyNCwiaWF0IjoxNzE5MzI4ODI0LCJuYmYiOjE3MTkzMjg4MjR9.15xG7dxgfSiPA28s2OigKitYwxGONci0ZzRCyFRoM50",
  );
});
