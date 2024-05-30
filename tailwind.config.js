/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      'main': ['Monaspace Neon Var', 'monospace'],
    },
    colors: {
      orange: {
        main: '#FF4F18',
        light: '#FF4F1838',
      },
      gray: {
        main: '#F2F4F7',
        light: '#F7F7F788',
        semi: '#DDDDDD',
        dark: '#90939A',
      },
      coal: {
        main: '#141517',
        light: '#47494C',
        dark: "#0F1013"
      },
      white: '#ffffff'
    },
    extend: {},
  },
  plugins: [],
}