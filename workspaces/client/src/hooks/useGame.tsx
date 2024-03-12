import { useCallback, useEffect, useState } from 'react';
import { useInterval } from './useInterval';
import { powderConfig } from '../domain/config/PowderConfig';
import { BoardType, VoidCell } from '../domain/blocks/BlockName';
import { useScoreStore } from '../domain/state/scoreStore';
import { useGamePhysics } from './useGamePhysics';
import { useGameStateStore } from '../domain/state/gameStateStore';
import { useBoardStateStore } from '../domain/state/boardStateStore';
import { render } from 'react-dom';

export const useGame = () => {
  const { incPlayerScore, incPlayerLines } = useScoreStore();
  const {
    startGame: start,
    endGame,
    started,
    paused,
    ended,
  } = useGameStateStore();
  const {
    renderedBoard,
    shape,
    shapeRow,
    shapeCol,
    hasCollision,
    dropBlock,
    isSettling,
    initializeBoard,
    setIsSettling,
    moveBlockLeft,
    moveBlockRight,
    rotateBlock,
    settleBlock,
    nextRound,
  } = useBoardStateStore();

  const { checkCollisions } = useGamePhysics();
  const [loopSpeed, setLoopSpeed] = useState<number | null>(null);
  const { DESINTEGRATION } = powderConfig;

  const startGame = useCallback(() => {
    setLoopSpeed(powderConfig.STANDARD_LOOP_SPEED);
    initializeBoard();
    start();
  }, [start]);

  const removeFullLines = useCallback(
    (board: BoardType): [number, BoardType] => {
      let removedLines = 0;
      const boardClone = structuredClone(board) as BoardType;
      for (let r = powderConfig.BOARD_ROWS - 1; r >= 0; r--) {
        if (boardClone[r].every((cell) => cell !== VoidCell.VOID)) {
          removedLines += 1;
          boardClone.splice(r, 1);
        }
      }
      return [removedLines, boardClone];
    },
    []
  );

  const gameLoop = useCallback(() => {
    if (isSettling) {
      if (
        !checkCollisions(
          renderedBoard,
          shape,
          shapeRow + 1 * DESINTEGRATION,
          shapeCol
        )
      ) {
        setIsSettling(false);
        setLoopSpeed(powderConfig.STANDARD_LOOP_SPEED);
        return;
      }

      settleBlock();
      const hasLost = nextRound(0, renderedBoard);
      if (hasLost) endGame(true);

      setLoopSpeed(powderConfig.STANDARD_LOOP_SPEED);
      setIsSettling(false);
    } else if (hasCollision) {
      setIsSettling(true);
      setLoopSpeed(powderConfig.COLLISION_LOOP_SPEED);
    } else {
      dropBlock();
    }
  }, [loopSpeed, isSettling, hasCollision]);

  useInterval(() => {
    if (!started || paused || ended) return;
    gameLoop();
  }, loopSpeed);

  useEffect(() => {
    if (!started || paused || ended) return;

    const handleKeyDownEvent = (e: KeyboardEvent) => {
      if (!started || paused || ended || e.repeat) return;

      switch (e.key) {
        case 'ArrowDown':
          setLoopSpeed(powderConfig.FASTDROP_LOOP_SPEED);
          break;
        case 'ArrowUp':
          rotateBlock();
          break;
        case 'ArrowRight':
          moveBlockRight();
          break;
        case 'ArrowLeft':
          moveBlockLeft();
          break;
      }
    };

    const handleKeyUpEvent = (e: KeyboardEvent) => {
      if (!started || paused || ended || e.repeat) return;

      switch (e.key) {
        case 'ArrowDown':
          setLoopSpeed(powderConfig.STANDARD_LOOP_SPEED);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDownEvent);
    document.addEventListener('keyup', handleKeyUpEvent);

    return () => {
      document.removeEventListener('keydown', handleKeyDownEvent);
      document.removeEventListener('keyup', handleKeyUpEvent);
    };
  }, [
    started,
    paused,
    ended,
    renderedBoard,
    loopSpeed,
    checkCollisions,

    isSettling,
  ]);

  return {
    startGame,
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
