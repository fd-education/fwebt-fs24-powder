import React from 'react';
import { SettingsGroup } from '../components/settings/SettingsGroup';
import { Scoreboard } from '../components/lobby/scoreboard/Scoreboard';
import { LobbyChat } from '../components/lobby/LobbyChat';
import { GameOptions } from '../components/lobby/GameOptions';
import { Title, TitleSize } from '../components/util/Title';

export const LobbyPage = () => {
  return (
    <div className='h-full w-full flex justify-around'>
      <div className='w-[30%] h-full flex flex-col justify-center'>
        <LobbyChat />
      </div>
      <div className='w-[30%] h-full flex flex-col justify-center items-center space-y-16'>
        <Title size={TitleSize.SMALL} />
        <div className='w-full flex flex-col items-center'>
          <GameOptions />
          <SettingsGroup />
        </div>
      </div>
      <div className='w-[30%] h-full flex flex-col justify-center'>
        <Scoreboard />
      </div>
    </div>
  );
};
