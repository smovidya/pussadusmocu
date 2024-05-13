"use client";

import { createContext, ReactNode, useContext, useState } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
  let [state, setState] = useState("Normal");
  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
