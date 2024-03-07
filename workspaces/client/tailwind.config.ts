import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      blocked: 'Blocked',
      sans: 'RobotoMono',
    },
    colors: {
      'primary-light': '#F0EAEA',
      'primary-dark': '#2C2727',
      white: '#FFFFFF',
      black: '#000000',
      'chat-bubble-received': '#303C33',
      'chat-bubble-sent': '#FFFFFF',
      'button-color': '#68926A',
      'powdromino-purple': '#6100FF',
      'powdromino-purple-light': '#B183FD',
      'powdromino-purple-dark': '#30007D',
      'powdromino-green': '#00FF47',
      'powdromino-green-light': '#9AFFB6',
      'powdromino-green-dark': '#00711F',
      'powdromino-red': '#FF0000',
      'powdromino-red-light': '#FF7E7E',
      'powdromino-red-dark': '#6A2121',
      'powdromino-sky': '#00D1FF',
      'powdromino-sky-light': '#9CEDFF',
      'powdromino-sky-dark': '#006C84',
      'powdromino-blue': '#0066FF',
      'powdromino-blue-light': '#70A9FF',
      'powdromino-blue-dark': '#05357C',
      'powdromino-orange': '#FFA800',
      'powdromino-orange-light': '#FFD789',
      'powdromino-orange-dark': '#845700',
      'powdromino-yellow': '#FFF500',
      'powdromino-yellow-light': '#FFFCB1',
      'powdromino-yellow-dark': '#777200',
    },
    extend: {
      backgroundImage: {
        'powder-hills-dark':
          'linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)), url("../public/powder-game-background.webp")',
        'powder-hills-light':
          'linear-gradient(rgba(255, 255, 255, .8), rgba(255, 255, 255, .8)), url("../public/powder-game-background.webp")',
      },
    },
  },
  darkMode: 'selector',
  plugins: [daisyui],
};

export default config;
