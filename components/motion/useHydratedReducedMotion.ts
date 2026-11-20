"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function useHydratedReducedMotion() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && Boolean(prefersReducedMotion);
}
