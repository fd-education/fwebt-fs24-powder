import React from 'react';
import { ScreenMode } from '../../domain/enums/ScreenMode';
import { useScreenModeStore } from '../../domain/state/screenModeStore';
import { MoonIcon } from '../icons/MoonIcon';
import { SunIcon } from '../icons/SunIcon';

export const ScreenModeToggle = () => {
  const { screenMode, setScreenMode } = useScreenModeStore();

  return screenMode === ScreenMode.LIGHT ? (
    <button
      data-testid='dark-mode'
      onClick={() => setScreenMode(ScreenMode.DARK)}
    >
      <MoonIcon />
    </button>
  ) : (
    <button
      data-testid='light-mode'
      onClick={() => setScreenMode(ScreenMode.LIGHT)}
    >
      <SunIcon />
    </button>
  );
};
