import { changeLanguage } from 'i18next';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum Languages {
  ENG = 'en-US',
  GER = 'de-CH',
}

interface LanguageState {
  language: Languages;
  setLanguage: (language: Languages) => void;
}

const getLanguage = (): Languages => {
  const isEng =
    'language' in localStorage &&
    JSON.parse(localStorage.language).state.language === Languages.ENG;

  const lang = isEng ? Languages.ENG : Languages.GER;
  return lang;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: getLanguage(),
      setLanguage: (language: Languages) => {
        changeLanguage(language);
        
        set(() => {
          return {
            language,
          };
        });
      },
    }),
    {
      name: 'language',
    }
  )
);
