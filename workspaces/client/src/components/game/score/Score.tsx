import React from 'react';
import { Panel } from '../../util/Panel';
import { PanelHeading } from '../../util/PanelHeading';
import { PowderButton } from '../../util/PowderButton';
import { NumberDisplay } from './NumberDisplay';
import { useScoreStore } from '../../../domain/state/scoreStore';
import { useGameStateStore } from '../../../domain/state/gameState';

export const Score = () => {
  const { playerScore, playerLines } = useScoreStore();
  const { pauseGame, endGame } = useGameStateStore();

  return (
    <Panel>
      <div className='flex flex-col justify-center space-y-4'>
        <div>
          <PanelHeading text='Score' />
          <NumberDisplay number={playerScore} />
        </div>
        <div>
          <PanelHeading text='Lines' />
          <NumberDisplay number={playerLines} />
        </div>
        <PowderButton text='pause' clickHandler={() => pauseGame()} />
        <PowderButton text='end' clickHandler={() => endGame()} />
      </div>
    </Panel>
  );
};
