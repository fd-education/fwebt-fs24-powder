import { useCallback, useEffect, useState } from 'react';
import { getRandomPowdromino, isColliding, useBoard } from './useBoard';
import { useInterval } from './useInterval';
import { PowderConfig } from '../domain/config/PowderConfig';
import { BoardType, PowdrominoTypes, VoidCell } from '../domain/enums/PowdrominoTypes';
import { POWDROMINOS, PowdrominoShape } from '../domain/game/Powdromino.shapes';

export const useGame = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [loopSpeed, setLoopSpeed] = useState<number | null>(null);
  const [isSettling, setIsSettling] = useState<boolean>(false);
  const [nextPowdrominos, setNextPowdrominos] = useState<PowdrominoTypes[]>();
  const [score, setScore] = useState<number>(0);

  const [{ board, shapeRow, shapeCol, block, shape }, dispatchState] =
    useBoard();

  const start = useCallback(() => {
    const startingPowdrominos = [
      getRandomPowdromino(),
      getRandomPowdromino(),
      getRandomPowdromino(),
    ];
    setNextPowdrominos(startingPowdrominos);
    setIsSettling(false);
    setStarted(true);
    setLoopSpeed(PowderConfig.STANDARD_LOOP_SPEED);
    dispatchState({ type: 'start' });
  }, [dispatchState]);

  const freezeSettledPosition = useCallback(() => {
    if (!isColliding(board, shape, shapeRow + 1, shapeCol)) {
      setIsSettling(false);
      setLoopSpeed(PowderConfig.STANDARD_LOOP_SPEED);
      return;
    }

    const boardWithFixedPowdromino = structuredClone(board) as BoardType;
    addShapeToBoard(boardWithFixedPowdromino, block, shape, shapeRow, shapeCol);

    let fullLines = 0;
    for(let r = PowderConfig.BOARD_ROWS - 1; r >= 0; r--){
      if(boardWithFixedPowdromino[r].every((cell) => cell !== VoidCell.VOID)){
        fullLines += 1;
        boardWithFixedPowdromino.splice(r, 1);
      }
    }
    setScore(prevScore => prevScore + calculateReward(fullLines));

    const updatedNextPowdrominos = structuredClone(
      nextPowdrominos
    ) as PowdrominoTypes[];
    const nextPowdromino = updatedNextPowdrominos.pop() as PowdrominoTypes;
    updatedNextPowdrominos.unshift(getRandomPowdromino());
    setNextPowdrominos(updatedNextPowdrominos);

    if(isColliding(board, POWDROMINOS[nextPowdromino].shape, 0, 3)){
      setStarted(false);
      setLoopSpeed(null);
    } else {
      setLoopSpeed(PowderConfig.STANDARD_LOOP_SPEED);
    }

    dispatchState({
      type: 'settle',
      updatedBoard: boardWithFixedPowdromino,
      nextPowdromino,
    });
  }, [board, dispatchState, block, shape, shapeRow, shapeCol, nextPowdrominos]);

  const gameLoop = useCallback(() => {
    if (isSettling) {
      freezeSettledPosition();
    } else if (isColliding(board, shape, shapeRow + 1, shapeCol)) {
      setLoopSpeed(PowderConfig.COLLISION_LOOP_SPEED);
      setIsSettling(true);
    } else {
      dispatchState({ type: 'drop' });
    }
  }, [
    board,
    dispatchState,
    shapeRow,
    shapeCol,
    shape,
    freezeSettledPosition,
    isSettling,
  ]);

  useInterval(() => {
    if (!started) return;
    gameLoop();
  }, loopSpeed);

  useEffect(() => {
    if (!started) return;

    const handleKeyDownEvent = (e: KeyboardEvent) => {
      if(e.repeat) return;

      if (e.key === 'ArrowUp') {
        dispatchState({
          type: 'move',
          isRotate: true,
        });
      }

      if (e.key === 'ArrowRight') {
        dispatchState({
          type: 'move',
          isMoveRight: true,
        });
      }

      if (e.key === 'ArrowLeft') {
        dispatchState({
          type: 'move',
          isMoveLeft: true,
        });
      }
    };

    document.addEventListener('keydown', handleKeyDownEvent);

    return () => {
      document.removeEventListener('keydown', handleKeyDownEvent);
      setLoopSpeed(PowderConfig.STANDARD_LOOP_SPEED);
    };
  }, [started, dispatchState]);

  const renderedBoard = structuredClone(board) as BoardType;
  if (started) {
    addShapeToBoard(renderedBoard, block, shape, shapeRow, shapeCol);
  }

  return {
    board: renderedBoard,
    start,
    started,
    score
  };
};

const calculateReward = (fullLines: number): number => {
  switch(fullLines){
    case 0:
      return 0;
    case 1:
      return 10;
    case 2:
      return 20;
    case 3: 
      return 30;
    case 4:
      return 40;
    default:
      throw new Error(`Unhandled number of full lines: ${fullLines}`);
  }
}

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
