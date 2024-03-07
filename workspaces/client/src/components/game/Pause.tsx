import React from 'react';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';
import { PowderButton } from '../util/PowderButton';
import { useGameStateStore } from '../../domain/state/gameState';

export const Pause = () => {
  const { continueGame } = useGameStateStore();

  return (
    <div className='h-full w-full fixed top-0 left-0  bg-primary-light-trans7 dark:bg-primary-dark-trans7 flex items-center justify-center'>
      <Panel>
        <div className='flex flex-col items-center space-y-8'>
          <PanelHeading text='paused' />
          <PowderButton text='continue' clickHandler={() => continueGame()} />
        </div>
      </Panel>
    </div>
  );
};
