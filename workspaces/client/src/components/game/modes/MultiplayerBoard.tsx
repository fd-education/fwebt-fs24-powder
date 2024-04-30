import { useGameStateStore } from '../../../domain/state/gameStateStore';
import React from 'react';
import { SettingsGroup } from '../../settings/SettingsGroup';
import { End } from '../End';
import { Pause } from '../Pause';
import { Lost } from '../Lost';
import { Board } from '../board/Board';
import { Preview } from '../preview/Preview';
import { Score } from '../score/Score';
import { GameProgressStates } from '@powder/common';

interface MultiplayerBoardProps {
  isRemote: boolean;
  opponentDisconnected?: boolean;
}
export const MultiplayerBoard = ({
  isRemote,
  opponentDisconnected = false,
}: MultiplayerBoardProps) => {
  const { progress } = useGameStateStore(false);
  const { progress: opponentProgress } = useGameStateStore(true);

  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <div className='h-full flex flex-row space-x-16'>
        <div className='relative flex flex-row space-x-2'>
          <div className='flex flex-col justify-between'>
            <Preview isOpponentPreview={true} />
            <Score isOpponentScore={true} isRemote={isRemote} />
          </div>
          <Board isOpponentBoard={true} />
          {opponentProgress === GameProgressStates.lost && (
            <Lost isMultiplayer={true} isOpponent={true} />
          )}
          {opponentProgress === GameProgressStates.paused && (
            <Pause isOpponent={true} isRemote={isRemote} />
          )}
          {(opponentDisconnected ||
            opponentProgress === GameProgressStates.ended) && (
            <End isOpponent={true} />
          )}
        </div>
        <div className='relative flex flex-row space-x-2'>
          <Board />
          {progress === GameProgressStates.lost && (
            <Lost isMultiplayer={true} />
          )}
          {progress === GameProgressStates.paused && (
            <Pause isRemote={isRemote} />
          )}
          {progress === GameProgressStates.ended && <End />}
          <div className='flex flex-col justify-between'>
            <Preview />
            <Score isRemote={isRemote} />
          </div>
        </div>
      </div>
      <SettingsGroup />
    </div>
  );
};
