import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./global.css"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        custom: {
          main: "#ff6565",
          pastel: "#FFBDBE",
          point: "#72c4ff",
          font: "#595959",
          gray: "#d9d9d9",
          gray_light: "#f9f9f9",
        }
      },
      fontSize: {
        cl_sm: "clamp(0.875rem, 2vw, 1rem)",
        cl_md: "clamp(1rem, 3vw, 1.25rem)",
        cl_lg: "clamp(1.25rem, 5vw, 1.75rem)",
      },
    },
    screens: {
      'sm': "640px",
      'md': "768px",
      'lg': "1024px",
      'xl': "1280px",
      '2xl': "1536px",
    }
  },
  plugins: [],
};
export default config;
