import React from 'react';
import { ScreenMode } from '../../domain/enums/ScreenMode.enum';
import { useScreenModeStore } from '../../domain/state/screenModeStore';
import { MoonIcon } from '../icons/MoonIcon';
import { SunIcon } from '../icons/SunIcon';

export const ScreenModeToggle = () => {
  const { screenMode, setScreenMode } = useScreenModeStore();

  return screenMode === ScreenMode.LIGHT ? (
    <button onClick={() => setScreenMode(ScreenMode.DARK)}>
      <MoonIcon />
    </button>
  ) : (
    <button onClick={() => setScreenMode(ScreenMode.LIGHT)}>
      <SunIcon />
    </button>
  );
};
