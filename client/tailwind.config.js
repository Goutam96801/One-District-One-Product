/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
      colors: {
          'white': '#FFFFFF',
          'black': '#1d1d1d',
          'grey': '#F3F3F3',
          'dark-grey': '#6B6B6B',
          'red': '#ff3559',
          'transparent': 'transparent',
          'twitter': '#1DA1F2',
          'purple': '#8B46FF',
          'indigo':'#4B0082',
          'purple_red':'#CA3DA4',
          'blur':'rgba(0,0,0,0.5)'
      },

      fontSize: {
          'sm': '12px',
          'base': '14px',
          'xl': '16px',
          '2xl': '20px',
          '3xl': '28px',
          '4xl': '38px',
          '5xl': '50px',
      },

      extend: {
        transitionDuration:{
          '2000':'2000ms',
          '3000':'3000ms',
          '4000':'4000ms',
          '5000':'5000ms',
        },
          fontFamily: {
            inter: ["'Inter'", "sans-serif"],
            gelasio: ["'Gelasio'", "serif"]
          },
          boxShadow: {
            '3xl': '0 6px 60px -10px rgba(0, 0, 0, 0.5)',
          },
          keyframes:{
            slideTop:{
              '0%':{
                transform:'translateY(100px)',
                opacity:'0'
              },
              '100%':{
                transform:'translateY(0px)',
                opacity:'1'
              }
            },
            slideRight:{
              '0%':{
                transform:'translateX(-100px)',
                opacity:'0'
              },
              '100%':{
                transform:'translateX(0px)',
                opacity:'1'
              }
            },
            slideBottom:{
              '0%':{
                transform:'translateY(-100px)',
                opacity:'0'
              },
              '100%':{
                transform:'translateY(0px)',
                opacity:'1'
              }
            },
            slideLeft:{
              '0%':{
                transform:'translateX(100px)',
                opacity:'0'
              },
              '100%':{
                transform:'translateX(0px)',
                opacity:'1'
              }
            }
          }
      },

  },
  plugins: [],
};