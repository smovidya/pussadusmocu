import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
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
      fontFamily: {
        "noto-sans": ['var(--font-sans)'],
      },
      fontSize: {
        H1: "64px",
        H2: "58px",
        H3: "24px",
        subHead1: "32px",
        subHead2: "28px",
        body1: "18px",
        body2: "16px",
        body3: "12px",
        body4: "10px",
        subHeadEng1: "20px",
        bodyEngBold1: "16px",
        bodyEng2: "16px",
        bodyEng3: "12px",
      },
      colors: {
        yellow01: "#F7CF47",
        yellow02: "#DAB021",
        yellow03: "#C39800",
        white01: "#FFFFFF",
        green01: "#219847",
        red01: "#C30016",
        grey01: "#6B6B6B",
        black01: "#000000",
        grey02: "#F2F2F2",
      },
      boxShadow: {
        inner: "5px 0px 20px 0px rgba(0, 0, 0, 0.25) inset",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
