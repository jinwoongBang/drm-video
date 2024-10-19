import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        sm: "576px",
        // md: "800px", // 768px에서 800px로 변경
        // lg: "1100px", // 1024px에서 1100px로 변경
        // xl: "1280px",
        // "2xl": "1536px",
      },
      maxWidth: {
        sm: "576px",
      },
    },
  },
  plugins: [],
};
export default config;
