/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      'primary': '#406254',
      'white': '#ffffff',
      'black': '#000000',
      'secondary': '#EFB343',
      'orange': '#FF3D00',
      'orange-800': '#E34234',
      'red': 'red',
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      inter: ["Inter", "sans-serif"]
    },
  },
  plugins: [],
}