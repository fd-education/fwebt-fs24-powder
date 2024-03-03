import { ScreenMode } from '../enums/ScreenMode.enum';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ScreenModeState {
  screenMode: ScreenMode;
  setScreenMode: (screenMode: ScreenMode) => void;
}

export const useScreenModeStore = create<ScreenModeState>()(
  persist(
    (set) => ({
      screenMode: ScreenMode.DARK,
      setScreenMode: (screenMode) => {
        if (
          screenMode === ScreenMode.DARK ||
          localStorage.theme === 'dark' ||
          (!('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }

        set({ screenMode });
      },
    }),
    {
      name: 'theme',
    }
  )
);
