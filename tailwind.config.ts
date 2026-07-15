import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#120B14",
        midnight: "#1A0F1D",
        card: "#211322",
        cardElevated: "#29172B",
        pinkHot: "#FF3D7F",
        pinkSoft: "#FF6B9D",
        coral: "#FF7657",
        honey: "#FFD166",
        violetDeep: "#7B4DFF",
        lilac: "#FF6B9D",
        roseSoft: "#FF6B9D",
        mist: "#FFF8FB",
        slateText: "#CBB8C6",
        mutedText: "#917D8C",
        danger: "#FF5A67",
        success: "#35D07F"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(255, 61, 127, 0.28)",
        rose: "0 18px 48px rgba(255, 61, 127, 0.32)",
        soft: "0 24px 80px rgba(11, 6, 16, 0.42)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.72", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2.8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
