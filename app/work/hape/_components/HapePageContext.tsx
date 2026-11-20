"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type HapePageContextValue = {
  activePageIndex: number;
  setActivePageIndex: (index: number) => void;
};

const HapePageContext = createContext<HapePageContextValue | null>(null);

export function HapePageProvider({ children }: { children: ReactNode }) {
  const [activePageIndex, setActivePageIndex] = useState(0);

  return (
    <HapePageContext.Provider value={{ activePageIndex, setActivePageIndex }}>
      {children}
    </HapePageContext.Provider>
  );
}

export function useHapePage() {
  const context = useContext(HapePageContext);
  if (!context) throw new Error("useHapePage must be used within HapePageProvider");
  return context;
}
