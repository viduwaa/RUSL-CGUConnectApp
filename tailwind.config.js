/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
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
}