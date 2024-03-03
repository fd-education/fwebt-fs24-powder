import React from 'react';
import { TitleSmall } from '../components/util/TitleSmall';
import { Board } from '../components/game/Board';
import { Score } from '../components/game/Score';
import { Preview } from '../components/game/Preview';
import { SettingsGroup } from '../components/settings/SettingsGroup';

export const GamePage = () => {
    return (
      <div className='h-full w-full flex justify-between'>
        <div className='h-full flex flex-col justify-center'>
          <TitleSmall />
          <Score />
        </div>
        <div className='h-full flex flex-col justify-center items-center'>
          <Board />
          <SettingsGroup/>
        </div>
        <div className='h-full flex flex-col justify-center'>
          <Preview />
        </div>
      </div>
    );
};
