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
        primary: {
          500: "#42BBFF",
          800: "#0C3247",
          900: "rgba(66, 187, 255, 0.1)",
        },
        black: {
          600: "#2E3757",
          700: "#1D2032",
          800: "#131625",
          900: "#2E3757",
        },
        white: {
          100: "#FFFFFF",
          300: "#ADB3CC",
          500: "#55597D",
        },
        purple: {
          500: "#9542FF",
          900: "rgba(149, 66, 255, 0.1)",
        },
        green: {
          400: "##68D1BF",
          500: "#42FF77",
          900: "rgba(66, 255, 119, 0.1)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
