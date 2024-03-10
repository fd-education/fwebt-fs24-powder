import React from 'react';
import { Panel } from '../../util/Panel';
import { Cell } from './Cell';
import { useGameStateStore } from '../../../domain/state/gameStateStore';
import { useBoardStateStore } from '../../../domain/state/boardStateStore';

export const Board = () => {
  const { paused } = useGameStateStore();
  const { renderedBoard } = useBoardStateStore();

  return (
    <Panel>
      <div className='border-2 border-white-transparent dark:border-black-transparent'>
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
