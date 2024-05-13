"use client";

import { createContext, ReactNode, useContext, useState } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
  const [type, setType] = useState("Normal");
  const [group, setGroup] = useState("Normal");
  const [department, setDepartment] = useState("Normal");

  return (
    <AppContext.Provider
      value={{ type, setType, group, setGroup, department, setDepartment }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
