import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      screens: {
        xxl: "1440px",
      },
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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
