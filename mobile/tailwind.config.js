/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#005fdb',
          dark: '#0047a3',
        },
        secondary: '#f0f4f8',
        accent: '#d1fae5',
        card: '#ffffff',
        border: '#e0e0e0',
        font: '#333333',
      },
      fontFamily: {
        sans: ['RobotoMono_400Regular'],
        'roboto': ['RobotoMono_400Regular'],
        'roboto-medium': ['RobotoMono_500Medium'],
        'roboto-bold': ['RobotoMono_700Bold'],
      },
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")],
}

