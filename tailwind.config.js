/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  // tailwind.config.js
  theme: {
    extend: {
      backgroundImage: {
        'custom-radial': 'radial-gradient(63.88% 129.61% at 25.55% 31.91%, #20135C 0%, #140739 92.82%)',
        'custom-form': 'linear-gradient(180deg, #1E1156 0%, rgba(28, 35, 64, 0) 100%);',
        'custom-shadow': '0 25px 25px 0 rgba(0, 3, 32, 0.5);'
      },
      boxShadow: {
        'custom-shadow': '0 25px 25px 0 rgba(0, 3, 32, 0.5)',
      },
    },
  },

  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.first-letter:uppercase::first-letter': {
          textTransform: 'uppercase',
        },
      });
    },
  ],
}

