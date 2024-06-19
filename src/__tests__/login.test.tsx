import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../app/login/page";

test("component", () => {
  render(<Page />);
  expect(screen.getAllByRole("img", { name: "iconBox" })).toBeDefined();
  expect(screen.getAllByRole("img", { name: "logoSmo" })).toBeDefined();
  expect(screen.getAllByText("สโมสรนิสิตคณะวิทยาศาสตร์")).toBeDefined();
  expect(
    screen.getAllByRole("button", { name: "LOGIN CHULA SSO" }),
  ).toBeDefined();
});
