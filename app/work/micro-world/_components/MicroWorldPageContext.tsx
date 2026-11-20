"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type MicroWorldPageContextValue = {
  activePageIndex: number;
  setActivePageIndex: (index: number) => void;
};

const MicroWorldPageContext = createContext<MicroWorldPageContextValue | null>(null);

export function MicroWorldPageProvider({ children }: { children: ReactNode }) {
  const [activePageIndex, setActivePageIndex] = useState(0);

  return (
    <MicroWorldPageContext.Provider value={{ activePageIndex, setActivePageIndex }}>
      {children}
    </MicroWorldPageContext.Provider>
  );
}

export function useMicroWorldPage() {
  const context = useContext(MicroWorldPageContext);
  if (!context) throw new Error("useMicroWorldPage must be used within MicroWorldPageProvider");
  return context;
}
