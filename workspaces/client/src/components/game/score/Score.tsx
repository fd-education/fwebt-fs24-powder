import React from 'react';
import { Panel } from '../../util/Panel';
import { PanelHeading } from '../../util/PanelHeading';
import { PowderButton } from '../../util/PowderButton';
import { NumberDisplay } from './NumberDisplay';
import { usePlayerScoreStore } from '../../../domain/state/scoreStore';
import { useGameStateStore } from '../../../domain/state/gameStateStore';

export const Score = () => {
  const { score, lines } = usePlayerScoreStore();
  const { pauseGame, endGame } = useGameStateStore();

  return (
    <Panel>
      <div className='flex flex-col justify-center space-y-4'>
        <div>
          <PanelHeading text='Score' />
          <NumberDisplay number={score} />
        </div>
        <div>
          <PanelHeading text='Lines' />
          <NumberDisplay number={lines} />
        </div>
        <PowderButton text='pause' clickHandler={() => pauseGame()} />
        <PowderButton text='end' clickHandler={() => endGame(false)} />
      </div>
    </Panel>
  );
};
