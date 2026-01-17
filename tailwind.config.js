/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Premium primary palette
        primary: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        // Accent colors
        accent: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
        },
        // Surface colors for dark mode
        surface: {
          dark: "#0f172a",
          card: "#1e293b",
          elevated: "#334155",
        },
      },
      fontFamily: {
        SourceSans3Medium: ["SourceSans3Medium", "sans"],
        SourceSans3MediumItalic: ["SourceSans3MediumItalic", "sans"],
        SourceSans3Thin: ["SourceSans3Thin", "sans"],
        SourceSans3ThinItalic: ["SourceSans3ThinItalic", "sans"],
        SourceSans3Bold: ["SourceSans3Bold", "sans"],
      },
    },
  },
  plugins: [],
};
