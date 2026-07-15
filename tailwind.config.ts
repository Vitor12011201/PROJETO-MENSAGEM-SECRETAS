import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#0B1020",
        violetDeep: "#6D4AFF",
        lilac: "#A78BFA",
        roseSoft: "#F472B6",
        mist: "#F8FAFC",
        slateText: "#94A3B8",
        danger: "#EF4444",
        success: "#22C55E"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(109, 74, 255, 0.26)"
      }
    }
  },
  plugins: []
};

export default config;

