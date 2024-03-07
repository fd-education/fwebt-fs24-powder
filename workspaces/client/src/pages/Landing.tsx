import React from 'react';
import { Title, TitleSize } from '../components/util/Title';
import { NameInput } from '../components/landing/NameInput';
import { SettingsGroup } from '../components/settings/SettingsGroup';

export const LandingPage = () => {
  return (
    <div className={`h-full w-full flex flex-col items-center`}>
      <Title size={TitleSize.BIG} />
      <div className={`h-full flex flex-col items-center justify-center`}>
        <NameInput />
        <SettingsGroup />
      </div>
    </div>
  );
};
