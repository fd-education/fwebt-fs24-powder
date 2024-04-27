import React from 'react';
import { ScreenModeToggle } from './ScreenModeToggle';
import { LanguageSelector } from './LanguageSelector';

export const SettingsGroup = () => {
  return (
    <div className={`flex flex-row space-x-8 my-5`}>
      <ScreenModeToggle />
      <LanguageSelector />
    </div>
  );
};
