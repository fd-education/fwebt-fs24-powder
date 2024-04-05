import { GameProgressStates } from '../../domain/game/gameProgress';
import { useGameStateStore } from '../../domain/state/gameStateStore';
import React from 'react';
import { SettingsGroup } from '../settings/SettingsGroup';
import { Title, TitleSize } from '../util/Title';
import { End } from './End';
import { Lost } from './Lost';
import { Pause } from './Pause';
import { PopupUnderlay } from './PopupUnderlay';
import { Board } from './board/Board';
import { Preview } from './preview/Preview';
import { Score } from './score/Score';

export const SinglePlayerGame = () => {
  const { progress } = useGameStateStore();

  return (
    <>
      {progress === GameProgressStates.lost && <Lost />}
      <div className='h-full flex flex-col justify-start content-center gap-48'>
        <Title size={TitleSize.SMALL} />
        <Score />
      </div>
      <div className='relative h-full flex flex-col justify-center items-center'>
        <div className='flex flex-row'>
          <Board />
        </div>
        <SettingsGroup />
        {progress !== GameProgressStates.started && <PopupUnderlay />}
        {progress === GameProgressStates.ended && <End />}
        {progress === GameProgressStates.paused && <Pause />}
      </div>
      <div className='h-full flex flex-col justify-center items-center'>
        <Preview />
      </div>
    </>
  );
};