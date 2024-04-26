import { create } from 'zustand';
import { persist } from 'zustand/middleware';

enum Languages {
  ENG,
  GER
}

interface LanguageState {
  language: Languages;
  setLanguage: (language: Languages) => void;
}

const getLanguage = (): Languages => {
  const isEng =
    ('language' in localStorage &&
      JSON.parse(localStorage.language).state.language === Languages.ENG);

  return isEng ? Languages.ENG : Languages.GER;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: getLanguage(),
      setLanguage: (language: Languages) => {
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
