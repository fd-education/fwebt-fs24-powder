import i18n from 'i18next';

import en from '../public/translations/en.json';
import de from '../public/translations/de.json';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en,
    de,
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
