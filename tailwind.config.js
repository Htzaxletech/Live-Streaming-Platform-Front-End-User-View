/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const defaultTheme = require("tailwindcss/defaultTheme")

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Noto Sans Myanmar", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        foreground: {
          DEFAULT: "rgb(var(--color-foreground) / <alpha-value>)",
          secondary: "rgb(var(--color-foreground-secondary) / <alpha-value>)",
          placeholder:
            "rgb(var(--color-foreground-placeholder) / <alpha-value>)",
        },
        background: {
          body: "rgb(var(--color-background-body) / <alpha-value>)",
          base: "rgb(var(--color-background-base) / <alpha-value>)",
          float: "rgb(var(--color-background-float) / <alpha-value>)",
          item: "rgb(var(--color-background-item) / <alpha-value>)",
          "item-hover":
            "rgb(var(--color-background-item-hover) / <alpha-value>)",
        },
        border: {
          DEFAULT: "rgb(var(--color-border) / <alpha-value>)",
        },
        primary: {
          50: "#ebfff7",
          100: "#cdfeea",
          200: "#9efada",
          300: "#63f2c7",
          400: "#26e3b1",
          500: "#00c798",
          600: "#00ad85",
          700: "#008f72",
          800: "#00705c",
          900: "#00614f",
          950: "#003830",
          DEFAULT: "#00c798",
        },
        danger: {
          50: "#fff1f2",
          100: "#ffdfe1",
          200: "#ffc5c8",
          300: "#ff9da2",
          400: "#ff646c",
          500: "#ff323d",
          600: "#ed1521",
          700: "#c80d17",
          800: "#a50f17",
          900: "#88141a",
          950: "#4b0408",
          DEFAULT: "#ff323d",
        },
      },
      opacity: {
        15: ".15",
        35: ".35",
        45: ".45",
        55: ".55",
        85: ".85",
      },
    },
  },
  plugins: [],
}
