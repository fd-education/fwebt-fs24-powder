import { GameProgressStates } from '../../domain/game/gameProgress';
import {
  useGameStateStore,
  useOpponentGameStateStore,
} from '../../domain/state/gameStateStore';
import React from 'react';
import { SettingsGroup } from '../settings/SettingsGroup';
import { End } from './End';
import { Pause } from './Pause';
import { PlayerLost } from './PlayerLost';
import { Board } from './board/Board';
import { Preview } from './preview/Preview';
import { Score } from './score/Score';

export const MultiplayerGame = () => {
  const { progress } = useGameStateStore();
  const { progress: opponentProgress } = useOpponentGameStateStore();

  return (
    <>
      <div className='h-full flex flex-col justify-center items-center'>
        <div className='flex flex-row space-x-16'>
          <div className='relative flex flex-row space-x-2'>
            <div className='flex flex-col justify-between'>
              <Preview isOpponentPreview={true} />
              <Score isOpponentScore={true} />
            </div>
            <Board isOpponentBoard={true} />
            {opponentProgress === GameProgressStates.lost && (
              <PlayerLost isOpponent={true} />
            )}
            {opponentProgress === GameProgressStates.paused && (
              <Pause isOpponent={true} />
            )}
            {opponentProgress === GameProgressStates.ended && (
              <End isOpponent={true} />
            )}
          </div>
          <div className='relative flex flex-row space-x-2'>
            <Board />
            {progress === GameProgressStates.lost && <PlayerLost />}
            {progress === GameProgressStates.paused && <Pause />}
            {progress === GameProgressStates.ended && <End />}
            <div className='flex flex-col justify-between'>
              <Preview />
              <Score />
            </div>
          </div>
        </div>
        <SettingsGroup />
      </div>
    </>
  );
};
