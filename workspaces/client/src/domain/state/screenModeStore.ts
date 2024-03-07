import { ScreenMode } from '../enums/ScreenMode.enum';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ScreenModeState {
  screenMode: ScreenMode;
  setScreenMode: (screenMode: ScreenMode) => void;
}

const getScreenMode = (): ScreenMode => {
  const isDark =
    ('theme' in localStorage &&
      JSON.parse(localStorage.theme).state.screenMode === 'dark') ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches) ||
    document.documentElement.classList.contains('dark');

  return isDark ? ScreenMode.DARK : ScreenMode.LIGHT;
};

export const useScreenModeStore = create<ScreenModeState>()(
  persist(
    (set) => ({
      screenMode: getScreenMode(),
      setScreenMode: (screenMode) => {
        set(() => {
          if (screenMode === ScreenMode.DARK) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }

          return {
            screenMode,
          };
        });
      },
    }),
    {
      name: 'theme',
    }
  )
);
