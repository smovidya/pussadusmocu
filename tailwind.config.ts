import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", "dark"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        inner: "5px 0px 20px 0px rgba(0, 0, 0, 0.25) inset",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
