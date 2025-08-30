"use client";

import { useTheme } from "next-themes";

export default function ThemeGate({ children }) {
  const { resolvedTheme, systemTheme } = useTheme();

  // Tant que resolvedTheme est undefined, on ne rend rien
  if (!resolvedTheme) {
    return null; // ou un spinner
  }

  return children;
}
