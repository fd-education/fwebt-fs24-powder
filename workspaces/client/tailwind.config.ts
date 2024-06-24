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
      'primary-light': 'rgba(240, 234, 234, 1)',
      'primary-light-trans8': 'rgba(240, 234, 234, .8)',
      'primary-light-trans7': 'rgba(240, 234, 234, .7)',
      'primary-dark': 'rgba(44, 39, 39, 1)',
      'primary-dark-trans8': 'rgba(44, 39, 39, .8)',
      'primary-dark-trans7': 'rgba(44, 39, 39, .7)',
      white: 'rgba(255, 255, 255, 1)',
      'white-transparent': 'rgba(255, 255, 255, .8)',
      black: 'rgba(0, 0, 0, 1)',
      'black-transparent': 'rgba(0, 0, 0, .3)',
      'chat-bubble-received': '303C33',
      'chat-bubble-sent': 'rgba(255, 255, 255, 1)',
      'button-color': 'rgba(104, 146, 106, 1)',
      'button-color-active': 'rgba(53, 183, 129, 1)',
      'powdromino-purple': 'rgba(97, 0, 255, 1)',
      'powdromino-purple-light': 'rgba(177, 131, 253, 1)',
      'powdromino-purple-dark': 'rgba(48, 0, 125, 1)',
      'powdromino-green': 'rgba(0, 255, 71, 1)',
      'powdromino-green-light': 'rgba(154, 255, 182, 1)',
      'powdromino-green-dark': 'rgba(0, 113, 31, 1)',
      'powdromino-red': 'rgba(255, 0, 0, 1)',
      'powdromino-red-light': 'rgba(255, 126, 126, 1)',
      'powdromino-red-dark': 'rgba(106, 33, 33, 1)',
      'powdromino-sky': 'rgba(0, 209, 255, 1)',
      'powdromino-sky-light': 'rgba(156, 237, 255, 1)',
      'powdromino-sky-dark': 'rgba(0, 108, 132, 1)',
      'powdromino-blue': 'rgba(0, 102, 255, 1)',
      'powdromino-blue-light': 'rgba(112, 169, 255, 1)',
      'powdromino-blue-dark': 'rgba(5, 53, 124, 1)',
      'powdromino-orange': 'rgba(255, 168, 0, 1)',
      'powdromino-orange-light': 'rgba(255, 215, 137, 1) ',
      'powdromino-orange-dark': 'rgba(132, 87, 0, 1)',
      'powdromino-yellow': 'rgba(255, 245, 0, 1)',
      'powdromino-yellow-light': 'rgba(255, 252, 177, 1)',
      'powdromino-yellow-dark': 'rgba(119, 114, 0, 1)',
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
