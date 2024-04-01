import React from 'react';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';
import { PowderButton } from '../util/PowderButton';
import {
  useGameStateStore,
  useOpponentGameStateStore,
} from '../../domain/state/gameStateStore';
import { useWebsocketStore } from '../../domain/state/websocketStateStore';
import { GameProgressStates } from '../../domain/game/gameProgress';

interface PauseProps {
  isOpponent?: boolean;
  isRemote?: boolean;
}

export const Pause = ({ isOpponent= false, isRemote = false }: PauseProps) => {
  const { continueGame: cont } = isOpponent
    ? useOpponentGameStateStore()
    : useGameStateStore();
  const { emitGameProgress } = useWebsocketStore();

  const continueGame = () => {
    console.log('Continue game - ', isRemote);
    cont();
    if (isRemote) emitGameProgress(GameProgressStates.started);
  };

  return (
    <div className='h-fit w-fit absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20'>
      <Panel transparent={false} width='w-fit'>
        <div className='flex flex-col items-center space-y-8'>
          <PanelHeading text='paused' />
          {!isOpponent && (
            <PowderButton text='continue' clickHandler={() => continueGame()} />
          )}
        </div>
      </Panel>
    </div>
  );
};
