import React from 'react';
import { TitleBig } from '../components/util/TitleBig';
import { NameInput } from '../components/landing/NameInput';
import { SettingsGroup } from '../components/settings/SettingsGroup';

export const LandingPage = () => {
  return (
    <div className={`h-full w-full flex flex-col items-center`}>
      <TitleBig />
      <div className={`h-full flex flex-col items-center justify-center`}>
        <NameInput />
        <SettingsGroup />
      </div>
    </div>
  );
};
