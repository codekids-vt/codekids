/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        tablet: { max: "640px" },
      },
      colors: {
        'primary-green': "#A7BB01",
        'hover-green': "#C3CD7A",
        'cardGreen': '#C3CD7A',
      },
      fontFamily: {
        press : ['"Press Start 2P"', 'cursive'],
      },
    },
  },
  plugins: [],
}
