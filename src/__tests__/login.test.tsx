import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../app/login/page";

test("icon-box-image", () => {
  render(<Page />);
  expect(screen.getAllByRole("img", { name: "iconBox" })).toBeDefined();
});

test("button-login", () => {
  render(<Page />);
  expect(
    screen.getAllByRole("button", { name: "LOGIN CHULA SSO" }),
  ).toBeDefined();
});
