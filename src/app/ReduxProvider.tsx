"use client";
import React from "react";
import { store } from "~/stores/store";
import { Provider } from "react-redux";

type Props = { children: React.ReactNode };

export default function ReduxProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
