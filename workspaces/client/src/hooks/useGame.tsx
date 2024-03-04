import { useCallback, useState } from 'react';
import { getRandomPowdromino, isColliding, useBoard } from './useBoard';
import { useInterval } from './useInterval';
import { PowderConfig } from '../domain/config/PowderConfig';
import { BoardType, PowdrominoTypes } from '../domain/enums/PowdrominoTypes';
import { PowdrominoShape } from '../domain/game/Powdromino.shapes';

export const useGame = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [loopSpeed, setLoopSpeed] = useState<number | null>(null);
  const [isSettling, setIsSettling] = useState<boolean>(false);
  const [nextPowdrominos, setNextPowdrominos] = useState<PowdrominoTypes[]>();

  const [{ board, shapeRow, shapeCol, block, shape }, dispatchState] =
    useBoard();

  const start = useCallback(() => {
    const startingPowdrominos = [
      getRandomPowdromino(),
      getRandomPowdromino(),
      getRandomPowdromino()
    ];
    setNextPowdrominos(startingPowdrominos);
    setIsSettling(false);
    setStarted(true);
    setLoopSpeed(PowderConfig.STANDARD_LOOP_SPEED);
    dispatchState({ type: 'start' });
  }, [dispatchState]);

  const freezeSettledPosition = useCallback(() => {
    if(!isColliding(board, shape, shapeRow + 1, shapeCol)){
      setIsSettling(false);
      setLoopSpeed(PowderConfig.STANDARD_LOOP_SPEED);
      return;
    }

    const boardWithFixedPowdromino = structuredClone(board) as BoardType;
    addShapeToBoard(boardWithFixedPowdromino, block, shape, shapeRow, shapeCol);

    const updatedNextPowdrominos = structuredClone(nextPowdrominos) as PowdrominoTypes[];
    const nextPowdromino = updatedNextPowdrominos.pop() as PowdrominoTypes;
    updatedNextPowdrominos.unshift(getRandomPowdromino());
    setNextPowdrominos(updatedNextPowdrominos);


    dispatchState({type: 'settle', updatedBoard: boardWithFixedPowdromino, nextPowdromino});
  }, [board, dispatchState, block, shape, shapeRow, shapeCol, nextPowdrominos])

  const gameLoop = useCallback(() => {
    if(isSettling){
      freezeSettledPosition();
    } else if (isColliding(board, shape, shapeRow + 1, shapeCol)) {
      setLoopSpeed(PowderConfig.COLLISION_LOOP_SPEED);
      setIsSettling(true);
    } else {
      dispatchState({ type: 'drop' });
    }
  }, [board, dispatchState, shapeRow, shapeCol, shape, freezeSettledPosition, isSettling]);

  useInterval(() => {
    if (!started) return;
    gameLoop();
  }, loopSpeed);

  const renderedBoard = structuredClone(board) as BoardType;
  if (started) {
    addShapeToBoard(renderedBoard, block, shape, shapeRow, shapeCol);
  }

  return {
    board: renderedBoard,
    start,
    started,
  };
};

const addShapeToBoard = (
  board: BoardType,
  block: PowdrominoTypes,
  shape: PowdrominoShape,
  shapeRow: number,
  shapeCol: number
) => {
  shape
    .filter((row) => row.some((hasBlock) => hasBlock))
    .forEach((row: boolean[], ri: number) => {
      row.forEach((hasBlock: boolean, ci: number) => {
        if (hasBlock) {
          board[shapeRow + ri][shapeCol + ci] = block;
        }
      });
    });
};
