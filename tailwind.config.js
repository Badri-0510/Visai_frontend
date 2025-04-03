/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,36,121,1) 44%, rgba(120,9,121,1) 77%)',
      },
    },
  },
  plugins: [],
}

