/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}'
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      uw: '1920px'
    },
    extend: {
      colors: {
        goldenOchre: '#D97706', // bg hint color for buttons and primary heading color for heading/title if the page bg is nightSky
        softCharcoal: '#2F3532', // bg color for sidebars
        deepCharcoal: '#272B25', // bg color for sidebar buttons on hover
        slateOnyx: '#3A403C', // bg color for footer and dropdown menu on larger screens
        charcoalGray: '#5A5F54', // primary bg color for page sections that alternate with nightSky
        charcoalGrayLight: '#C9C1B6', // text for profile pages with charcoalGray bg
        stoneGray: '#A9AEA2', // a lighter shade of ashGray
        ashGray: '#6F7469', // primary color for body text
        nightSky: '#1D2120', // primary bg color for page sections that alternate with charcoalGray and dropdown menu on smaller screens
        cloudGray: '#FFFFFF', // primary color for heading/title if the page bg is charcoalGray
        softGray: '#F5F6F1', // bg color for auth pages, forum landing page and contact page
        'modal-translucent': 'rgb(28, 30, 36, 0.80)'
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
        'barlow': ['Barlow', 'sans-serif'],
        'os': ['Open Sans', 'sans-serif'],
        'inter': ['Inter', 'sans-serif']
      },
      fontSize: {
        '1.375': '1.375rem', //22px
        '1.75': '1.75rem', // 28px
      },
      fontWeight: {
        'r': '400',
        'b': '700',
        'eb': '800'
      },
      spacing: {
        '0.21': '0.21rem', // 3.36px
        '0.5': '0.5rem', // 8px
        '[x-pad]': '1rem', // 16px
        '1.875': '1.875rem', // 30px
        '2.375': '2.375rem', // 38px
        '4.1875': '4.1875rem', // 67px
        '4.5': '4.5rem', // 72px
        '6.25': '6.25rem', // 100px
        '10.25': '10.25rem', // 164px
      },
      height: {
        '9.5': '9.5rem', // 152px
      },
      boxShadow: {
        '3xl': '0px 0px 12px 0 #757575',
        inner: 'inset -2px 0px 18px 10px #131519',
        outer: '0px 0px 4px 2px rgba(150, 150, 150, 0.2)'
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          /* For modern browsers */
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          'display': 'none', /* Chrome, Safari, and Opera */
        },
      }, ['responsive', 'hover']);
    },
  ]
}


