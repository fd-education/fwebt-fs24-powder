import React from 'react';
import { Panel } from '../../util/Panel';
import { PanelHeading } from '../../util/PanelHeading';
import { PowderButton } from '../../util/PowderButton';
import { NumberDisplay } from './NumberDisplay';

interface ScoreProps {
  score: number;
  lines: number;
}

export const Score = ({ score, lines }: ScoreProps) => {
  const pauseGame = () => {
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
          <NumberDisplay number={score} />
        </div>
        <div>
          <PanelHeading text='Lines' />
          <NumberDisplay number={lines} />
        </div>
        <PowderButton text='pause' clickHandler={() => pauseGame()} />
        <PowderButton text='end' clickHandler={endGame} />
      </div>
    </Panel>
  );
};
