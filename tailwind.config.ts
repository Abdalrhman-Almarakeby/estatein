/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        "DEFAULT": "1rem",
        "xs": "1rem",
        "sm": "2rem",
        "md": "2rem",
        "lg": "4rem",
        "xl": "5rem",
        "2xl": "6rem",
        "3xl": "7rem",
      },
    },
    extend: {
      spacing: {
        "15": "3.75rem",
        "30": "7.5rem",
        "4.5": "1.125rem",
        "6.5": "1.625rem",
        "7.5": "1.875rem",
        "11.5": "2.875rem",
        "12.5": "3.125rem",
        "24.5": "6.125rem",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "menu-open": {
          from: {
            right: "-110%",
          },
          to: {
            right: "0",
          },
        },
        "menu-close": {
          from: {
            display: "flex",
            right: "0",
          },
          to: {
            display: "none",
            right: "-110%",
          },
        },
        "caret-blink": {
          "0%,70%,100%": {
            opacity: "1",
          },
          "20%,50%": {
            opacity: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "menu-open": "menu-open 0.3s ease-in-out",
        "menu-close": "menu-close 0.3s ease-in-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      colors: {
        purple: {
          base: "var(--color-purple-base)",
          medium: "var(--color-purple-medium)",
          light: "var(--color-purple-light)",
        },
        gray: {
          darkest: "var(--color-gray-darkest)",
          darker: "var(--color-gray-darker)",
          dark: "var(--color-gray-dark)",
          medium: "var(--color-gray-medium)",
          light: "var(--color-gray-light)",
        },
      },
      screens: {
        "xs": "400px",
        "3xl": "1600px",
      },
      borderColor: {
        DEFAULT: "#262626",
      },
      backgroundImage: {
        "gradient-1": "linear-gradient(90deg, #1A1A1A 0%, #1a1a1a00 100%)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-container-break-out"),
  ],
};
export default config;
