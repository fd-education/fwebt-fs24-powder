import React from 'react';
import { Panel } from '../../util/Panel';
import { PanelHeading } from '../../util/PanelHeading';
import { PowderButton } from '../../util/PowderButton';
import { NumberDisplay } from './NumberDisplay';
import {
  useOpponentScoreStore,
  usePlayerScoreStore,
} from '../../../domain/state/scoreStore';
import { useGameStateStore } from '../../../domain/state/gameStateStore';

interface ScoreProps {
  isOpponentScore?: boolean;
}

export const Score = ({ isOpponentScore = false }: ScoreProps) => {
  const { score, lines } = isOpponentScore
    ? useOpponentScoreStore()
    : usePlayerScoreStore();
  const { pauseGame, endGame } = useGameStateStore();

  return (
    <Panel paddingY='py-4'>
      <div className='flex flex-col justify-center space-y-4'>
        <div>
          <PanelHeading text='Score' />
          <NumberDisplay number={score} />
        </div>
        <div>
          <PanelHeading text='Lines' />
          <NumberDisplay number={lines} />
        </div>
        {!isOpponentScore && (
          <PowderButton text='pause' clickHandler={() => pauseGame()} />
        )}
        {!isOpponentScore && (
          <PowderButton text='end' clickHandler={() => endGame(false)} />
        )}
      </div>
    </Panel>
  );
};
