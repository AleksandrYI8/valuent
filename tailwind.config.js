/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-radial': 'radial-gradient(63.88% 129.61% at 25.55% 31.91%, #20135C 0%, #140739 92.82%)',
        'custom-form': 'linear-gradient(180deg, #1E1156 0%, rgba(28, 35, 64, 0) 100%);',
        'custom-shadow': '0 25px 25px 0 rgba(0, 3, 32, 0.5);',
        'custom-main': 'radial-gradient(46.41% 73.99% at 46.63% 48.05%, #20135C 0%, #140739 92.82%)',
        'background-balance': 'linear-gradient(180deg, rgba(27, 18, 78, 0.2) 0%, #0F0B38 93.37%)',
        'background-btc': 'linear-gradient(237.07deg, #604392 -8.06%, #0F0B38 96.63%);',
        'background-eth': 'linear-gradient(237.07deg, #6162D6 -8.06%, #0F0B38 96.63%);',
        'background-grc': 'linear-gradient(237.07deg, #D66168 -8.06%, #0F0B38 96.63%);',
        'background-ae': 'linear-gradient(237.07deg, #EB8338 -8.06%, #0F0B38 96.63%);',
      },
      boxShadow: {
        'custom-shadow': '0 25px 25px 0 rgba(0, 3, 32, 0.5)',
        'menu-shadow': '0px -5px 25px 0px rgba(0, 3, 32, 0.5)',
        'main-box-shadow': '0px 15px 40px 0px rgba(0, 0, 0, 0.25)',
        'balance-box-shadow': '0px 4px 4px 0px rgba(0, 151, 232, 0.2)',
      },
    },
  },

  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.first-letter:uppercase::first-letter': {
          textTransform: 'uppercase',
        },
        '.no-clear-btn::-webkit-search-cancel-button': {
          '-webkit-appearance': 'none',
          'appearance': 'none',
        }
      });
    },
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    },
  ],
}
