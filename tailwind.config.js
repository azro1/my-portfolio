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
      xl: '1440px'
    },
    extend: {
      colors: {
        accentRed: '#A52A2A',
        deepCharcoal: '#131519',
        softCharcoal: '#191b20',
        onyx: '#16181C',
        stoneGray: '#757575',
        nightSky: '#1C1E24',
        frostWhite: '#f2f2f2',
        cloudGray: '#E0E0E3',
        discordPurple: '#6A5ACD',
        githubDark: '#323439',
        googleRed: '#DC2626',
        'modal-translucent': 'rgb(28, 30, 36, 0.70)'
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
        'barlow': ['Barlow', 'sans-serif'],
        'os': ['Open Sans', 'sans-serif'],
        'cn': ['Courier New', 'monospace']
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
        '1.375': '1.375rem', // 22px
        '1.625': '1.625rem', // 26px
        '1.875': '1.875rem', // 30px
        '2.375': '2.375rem', //38px
        '3.125': '3.125rem', // 50px
        '4.1875': '4.1875rem', // 67px
        '4.5': '4.5rem', // 72px
        '6.25': '6.25rem', // 100px
        '8.375': '8.375rem', // 134px
        '10.25': '10.25rem', // 164px
        '12.5': '12.5rem', // 200px
        '13.5': '13.5rem', // 216px
        '15.75': '15.75rem', // 252px
      },
      inset: {
        '26': '26rem',
        '8.625': '8.625rem', // 136px
      },
      height: {
        // Small heights
        '4.75': '4.75rem', // 76px
        '9.5': '9.5rem', // 152px
        '9.8': '9.8rem', // 156.8px
        '30': '7.5rem', // 120px

        // Page heights
        'page-height': '34.8rem', // 556.8px
        'auth-page-height': '28rem', // 384px
        'projects-page-height': '57.2rem', // 915.2px
        'profile-page-height': '47rem',

        // Specific component heights
        'projectsList-height': '17.4rem', // 278.4px

        // Large heights
        '34': '34rem', // 544px
      },
      boxShadow: {
        '3xl': '0px 0px 12px 0 #757575',
        inner: 'inset -2px 0px 18px 10px #131519',
        outer: '0px 0px 16px 4px #131519'
      },
      maxHeight: {
        'custom-sm': '25vh',
        'custom-md': '50vh',
        'custom-lg': '75vh',
        'custom-fixed': '890px'
      },
      minHeight: {
        'custom-sm': '25vh',
        'custom-md': '50vh',
        'custom-lg': '75vh'
      },
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


