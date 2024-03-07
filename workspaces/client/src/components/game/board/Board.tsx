import React from 'react';
import { Panel } from '../../util/Panel';
import { Cell } from './Cell';
import { useGameStateStore } from '../../../domain/state/gameState';

export const Board = () => {
  const { renderedBoard, paused } = useGameStateStore();

  return (
    <Panel>
      <div>
        {renderedBoard.map((row, ri) => (
          <div key={ri} className='flex'>
            {row.map((cell, ci) => (
              <Cell key={`${ri}-${ci}`} cellType={cell} display={!paused} />
            ))}
          </div>
        ))}
      </div>
    </Panel>
  );
};
