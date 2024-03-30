import React from 'react';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';
import { PowderButton } from '../util/PowderButton';
import {
  useGameStateStore,
  useOpponentGameStateStore,
} from '../../domain/state/gameStateStore';

interface PauseProps {
  isOpponent?: boolean;
}

export const Pause = ({ isOpponent }: PauseProps) => {
  const { continueGame } = isOpponent
    ? useOpponentGameStateStore()
    : useGameStateStore();

  return (
    <div className='h-fit w-fit absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20'>
      <Panel transparent={false} width='w-fit'>
        <div className='flex flex-col items-center space-y-8'>
          <PanelHeading text='paused' />
          <PowderButton text='continue' clickHandler={() => continueGame()} />
        </div>
      </Panel>
    </div>
  );
};
