import React from 'react';
import { Panel } from '../../util/Panel';
import { PanelHeading } from '../../util/PanelHeading';
import { PowderButton } from '../../util/PowderButton';
import { NumberDisplay } from './NumberDisplay';
import { useGame } from '../../../hooks/useGame';
import { useScoreStore } from '../../../domain/state/scoreStore';

export const Score = () => {
  const {pauseGame} = useGame();
  const {playerScore, playerLines} = useScoreStore();

  const pause = () => {
    pauseGame();
    console.log('TBD')
  }

  const endGame = () => {
    console.log('TBD')
  }

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
        <PowderButton text='pause' clickHandler={() => pause()} />
        <PowderButton text='end' clickHandler={endGame} />
      </div>
    </Panel>
  );
};
