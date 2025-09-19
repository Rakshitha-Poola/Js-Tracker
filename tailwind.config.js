// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        floatX: {
          "0%, 100%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(20px)" },
        },
        rotateSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        floatX: "floatX 8s ease-in-out infinite",
        rotateSlow: "rotateSlow 25s linear infinite",
      },
    },
  },
  plugins: [],
};
