import React from 'react';
import { Panel } from '../../util/Panel';
import { Cell } from './Cell';
import { useGameStateStore } from '../../../domain/state/gameStateStore';
import {
  useBoardStateStore,
  useOpponentBoardStateStore,
} from '../../../domain/state/boardState/boardStateStore';
import { GameProgressStates } from '../../../domain/game/gameProgress';

interface BoardProps {
  isOpponentBoard?: boolean;
}

export const Board = ({ isOpponentBoard = false }: BoardProps) => {
  const { progress } = useGameStateStore();
  const { renderedBoard } = isOpponentBoard
    ? useOpponentBoardStateStore()
    : useBoardStateStore();

  return (
    <Panel>
      <div className='border-2 border-white-transparent dark:border-black-transparent'>
        {renderedBoard.map((row, ri) => (
          <div key={ri} className='flex'>
            {row.map((cell, ci) => (
              <Cell
                key={`${ri}-${ci}`}
                type={cell}
                display={progress === GameProgressStates.started}
              />
            ))}
          </div>
        ))}
      </div>
    </Panel>
  );
};
