import { useCallback, useEffect, useState } from 'react';
import { getRandomPowdromino, isColliding, useBoard } from './useBoard';
import { useInterval } from './useInterval';
import { PowderConfig } from '../domain/config/PowderConfig';
import {
  BoardType,
  BlockName,
  VoidCell,
} from '../domain/enums/BlockName';
import { blockShapes, BlockShape } from '../domain/game/Powdromino.shapes';
import { useScoreStore } from '../domain/state/scoreStore';

export const useGame = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [loopSpeed, setLoopSpeed] = useState<number | null>(null);
  const [isSettling, setIsSettling] = useState<boolean>(false);
  const [nextPowdrominos, setNextPowdrominos] = useState<BlockName[]>();

  const {incPlayerScore, incPlayerLines} = useScoreStore();

  const [{ board, shapeRow, shapeCol, block, shape }, dispatchState] =
    useBoard();

  const startGame = useCallback(() => {
    console.log('Start Game');

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

  const pauseGame = useCallback(() => {
    console.log('Pause Game');

    setStarted(false);
    setPaused(true);
    setLoopSpeed(null);

    dispatchState({
      type: 'pause',
    });
  }, [dispatchState]);

  const freezeSettledPosition = useCallback(() => {
    console.log('Freeze Position');

    if (!isColliding(board, shape, shapeRow + 1, shapeCol)) {
      setIsSettling(false);
      setLoopSpeed(PowderConfig.STANDARD_LOOP_SPEED);
      return;
    }

    const boardWithFixedPowdromino = structuredClone(board) as BoardType;
    addShapeToBoard(boardWithFixedPowdromino, block, shape, shapeRow, shapeCol);

    let fullLines = 0;
    for (let r = PowderConfig.BOARD_ROWS - 1; r >= 0; r--) {
      if (boardWithFixedPowdromino[r].every((cell) => cell !== VoidCell.VOID)) {
        fullLines += 1;
        boardWithFixedPowdromino.splice(r, 1);
      }
    }

    incPlayerScore(calculateReward(fullLines));
    incPlayerLines(fullLines);

    const updatedNextPowdrominos = structuredClone(
      nextPowdrominos
    ) as BlockName[];
    const nextPowdromino = updatedNextPowdrominos.pop() as BlockName;
    updatedNextPowdrominos.unshift(getRandomPowdromino());
    setNextPowdrominos(updatedNextPowdrominos);

    if (isColliding(board, blockShapes[nextPowdromino].shape, 0, 3)) {
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
    console.log('Game Loop');
    console.log('IsPaused: ', paused);
    console.log('IsStarted: ', started);


    if (isSettling) {
      freezeSettledPosition();
    } else if (isColliding(board, shape, shapeRow + 1, shapeCol)) {
      setLoopSpeed(PowderConfig.COLLISION_LOOP_SPEED);
      setIsSettling(true);
    } else if(paused){
      setLoopSpeed(null);
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
      if (e.repeat) return;

      if (e.key === 'ArrowDown') {
        setLoopSpeed(50);
      }

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

    const handleKeyUpEvent = (e: KeyboardEvent) => {
      if (e.repeat) return;

      if (e.key === 'ArrowDown') {
        setLoopSpeed(PowderConfig.STANDARD_LOOP_SPEED);
      }
    };

    document.addEventListener('keydown', handleKeyDownEvent);
    document.addEventListener('keyup', handleKeyUpEvent);

    return () => {
      document.removeEventListener('keydown', handleKeyDownEvent);
      document.removeEventListener('keyup', handleKeyUpEvent);
      setLoopSpeed(PowderConfig.STANDARD_LOOP_SPEED);
    };
  }, [started, dispatchState]);

  const renderedBoard = structuredClone(board) as BoardType;
  if (started) {
    addShapeToBoard(renderedBoard, block, shape, shapeRow, shapeCol);
  }

  const previewBlocks = getPreviewBlocks(nextPowdrominos);

  return {
    board: renderedBoard,
    startGame,
    pauseGame,
    started,
    previewBlocks,
  };
};

const calculateReward = (fullLines: number): number => {
  switch (fullLines) {
    case 0:
      return 0;
    case 1:
      return 10;
    case 2:
      return 30;
    case 3:
      return 60;
    case 4:
      return 100;
    default:
      throw new Error(`Unhandled number of full lines: ${fullLines}`);
  }
};

export const addShapeToBoard = (
  board: BoardType,
  powdromino: BlockName,
  shape: BlockShape,
  shapeRow: number,
  shapeCol: number
) => {
  shape
    .filter((row) => row.some((hasBlock) => hasBlock))
    .forEach((row: boolean[], ri: number) => {
      row.forEach((hasBlock: boolean, ci: number) => {
        if (hasBlock) {
          board[shapeRow + ri][shapeCol + ci] = powdromino;
        }
      });
    });
};

export const getPreviewBlocks = (next: BlockName[]): BoardType[] => {
  if (!next) return;

  const boards: BoardType[] = [];

  next.forEach((powdromino) => {
    const shape = blockShapes[powdromino].shape.filter((row: boolean[]) =>
      row.some((hasBlock) => hasBlock)
    );

    const board = Array(shape.length)
      .fill(null)
      .map(() => Array(shape[0].length).fill(VoidCell.VOID));

    addShapeToBoard(board, powdromino, shape, 0, 0);
    boards.push(board);
  });

  return boards;
};
