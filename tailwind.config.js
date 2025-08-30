import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "media",
  plugins: [heroui(), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#570df8",
          secondary: "#f000b8",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
          info: "#2094f3",
          success: "#009485",
          warning: "#ff9900",
          // ici tu personnalises ta couleur danger (danger = error dans daisyui)
          error: "#b91c1c", // rouge sombre (tailwind red-700)
          "error-focus": "#7f1d1d", // rouge foncé pour focus
          "error-content": "#ffffff", // texte sur bouton danger
        },
      },
    ],
  },
};

module.exports = config;