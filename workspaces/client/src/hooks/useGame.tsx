import { useCallback, useState } from 'react';
import { useBoard } from './useBoard'
import { useInterval } from './useInterval';
import { PowderConfig } from '../domain/config/PowderConfig';
import { PowdrominoTypes } from '../domain/enums/PowdrominoTypes';

export const useGame = () => {
  const [{board, position, block, shape}, dispatchState] = useBoard();
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const gameLoop = useCallback(() => {
    dispatchState({type: 'drop'});
  }, [dispatchState]);

  useInterval(() => {
    if(!gameStarted) return;

    gameLoop();
  }, PowderConfig.LOOP_SPEED);

  const start = useCallback(() => {
    setGameStarted(true);
    dispatchState({ type: 'start' });
  }, [dispatchState]);

  const renderedBoard = structuredClone(board) as PowdrominoTypes[][];

  if(gameStarted){
    shape
    .filter(row => row.some(hasBlock => hasBlock))
    .forEach((row: boolean[], ri: number) => {
      row.forEach((hasBlock: boolean, ci: number) => {
        if(hasBlock){
          renderedBoard[position.row + ri][position.col + ci] = block;
        }
      })
    })
  }

  return {
    board: renderedBoard,
    start,
    gameStarted
  }
}