import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        abyss: "#0b1220",
        slateglass: "#1a2638",
        cyansoft: "#7dd3fc",
        purplemuted: "#8b85ff"
      }
    }
  },
  plugins: []
} satisfies Config;
