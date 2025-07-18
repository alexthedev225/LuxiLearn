"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function HighlightThemeLoader() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const id = "hljs-theme";
    const existing = document.getElementById(id) as HTMLLinkElement | null;

    const themeHref =
      resolvedTheme === "dark"
        ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/atom-one-dark.min.css"
        : "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/atom-one-light.min.css";

    if (existing) {
      existing.href = themeHref;
    } else {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = themeHref;
      document.head.appendChild(link);
    }
  }, [resolvedTheme]);

  return null;
}
