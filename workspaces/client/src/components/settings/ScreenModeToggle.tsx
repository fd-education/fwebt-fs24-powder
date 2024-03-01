import React from 'react';
import { ScreenMode } from '../../domain/enums/ScreenMode.enum';
import { useScreenModeStore } from '../../domain/state/screenModeStore';

export const ScreenModeToggle = () => {
  const { screenMode, setScreenMode } = useScreenModeStore()

  return screenMode === ScreenMode.LIGHT ? (
    <button onClick={() => setScreenMode(ScreenMode.DARK)}>
      Dark Mode
    </button>
  ) : (
    <button onClick={() => setScreenMode(ScreenMode.LIGHT)}>
      Light Mode
    </button>
  )
}