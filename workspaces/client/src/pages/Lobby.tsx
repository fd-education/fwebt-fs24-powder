import React from 'react';
import { TitleSmall } from '../components/util/TitleSmall';
import { SettingsGroup } from '../components/settings/SettingsGroup';
import { Scoreboard } from '../components/lobby/Scoreboard';
import { LobbyChat } from '../components/lobby/LobbyChat';
import { GameOptions } from '../components/lobby/GameOptions';

export const LobbyPage = () => {
  return (
    <div className='h-full w-full flex justify-between'>
      <div className='h-full flex flex-col justify-center'>
        <LobbyChat />
      </div>
      <div className='h-full flex flex-col justify-center items-center'>
        <TitleSmall />
        <GameOptions/>
        <SettingsGroup />
      </div>
      <div className='h-full flex flex-col justify-center'>
        <Scoreboard />
      </div>
    </div>
  );
};
