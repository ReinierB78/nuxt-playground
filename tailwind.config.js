/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          800: 'hsl(25, 95%, 20%)',
          500: 'hsl(25, 95%, 50%)',
          200: 'hsl(25, 95%, 80%)',
          DEFAULT: 'hsl(25, 95%, 50%)',
        }, 
        foo: {
          bar: {
            DEFAULT: 'rgba(69, 25, 82, 0.5)'
          }
        }
      }
    },
  },
  plugins: [],
}
