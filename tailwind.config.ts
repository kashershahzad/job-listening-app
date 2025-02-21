import { light } from "@mui/material/styles/createPalette";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lightblue:"#0B9AF7",
        darkblue : "#1967A9"
      },
    },
  },
  plugins: [],
} satisfies Config;
