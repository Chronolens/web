import type { Config } from "tailwindcss";

const config: Config = {
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
        purple: { bg: "#392548" },
        red: { dark: "#fd93ff", light: "#ff5555" },
        green: { light: "#92ffa9" },
        blue: { dark: "#fd93ff", light: "#84edff" },
        yellow: { light: "#ffecad" },
        pink: { light: "#fd93ff" },
      },
      backgroundImage: {
        // WARN: REMEMBER TO CHANGE THIS IF YOU CHANGE THE COLORS
        "gradient-primary":
          "linear-gradient(90deg,rgba(41, 19, 19, 1),rgba(19, 29, 40, 1))",
        "gradient-metadata":
          "linear-gradient(90deg,rgba(41, 19, 19, 1),rgba(19, 29, 40, 1))",
        "gradient-sidebar-button":
          "linear-gradient(90deg,rgba(41, 19, 19, 1),rgba(19, 29, 40, 1),rgba(0,0,0,1))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
