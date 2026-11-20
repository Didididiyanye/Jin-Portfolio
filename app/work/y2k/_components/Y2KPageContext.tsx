"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Y2KPageContextValue = {
  activePageIndex: number;
  setActivePageIndex: (index: number) => void;
};

const Y2KPageContext = createContext<Y2KPageContextValue | null>(null);

export function Y2KPageProvider({ children }: { children: ReactNode }) {
  const [activePageIndex, setActivePageIndex] = useState(0);

  return (
    <Y2KPageContext.Provider value={{ activePageIndex, setActivePageIndex }}>
      {children}
    </Y2KPageContext.Provider>
  );
}

export function useY2KPage() {
  const context = useContext(Y2KPageContext);
  if (!context) throw new Error("useY2KPage must be used within Y2KPageProvider");
  return context;
}
