"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type PetlyPageContextValue = {
  activePageIndex: number;
  setActivePageIndex: (index: number) => void;
};

const PetlyPageContext = createContext<PetlyPageContextValue | null>(null);

export function PetlyPageProvider({ children }: { children: ReactNode }) {
  const [activePageIndex, setActivePageIndex] = useState(0);

  return (
    <PetlyPageContext.Provider value={{ activePageIndex, setActivePageIndex }}>
      {children}
    </PetlyPageContext.Provider>
  );
}

export function usePetlyPage() {
  const context = useContext(PetlyPageContext);
  if (!context) throw new Error("usePetlyPage must be used within PetlyPageProvider");
  return context;
}
