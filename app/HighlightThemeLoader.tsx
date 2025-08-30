"use client";
import { useEffect } from "react";

export function HighlightThemeLoader() {
  useEffect(() => {
    const setHljsTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      const existing = document.getElementById(
        "hljs-theme"
      ) as HTMLLinkElement | null;

      const themeHref = isDark
        ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github-dark.min.css"
        : "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github.min.css";

      if (existing) {
        existing.href = themeHref;
      } else {
        const link = document.createElement("link");
        link.id = "hljs-theme";
        link.rel = "stylesheet";
        link.href = themeHref;
        document.head.appendChild(link);
      }
    };

    // Initial
    setHljsTheme();

    // Observer les changements de classe dark
    const observer = new MutationObserver(() => setHljsTheme());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
