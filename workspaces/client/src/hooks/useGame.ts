import { useCallback, useEffect, useState } from 'react';
import { useInterval } from './useInterval';
import { powderConfig } from '../domain/config/PowderConfig';
import { useScoreStore } from '../domain/state/scoreStore';
import { useGamePhysics } from './useGamePhysics';
import { useGameStateStore } from '../domain/state/gameStateStore';
import { useBoardStateStore } from '../domain/state/boardStateStore';

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
  const {
    DESINTEGRATION,
    BASE_STANDARD_LOOP_SPEED,
    BASE_COLLISION_LOOP_SPEED,
    BASE_FASTDROP_LOOP_SPEED,
  } = powderConfig;

  const startGame = useCallback(() => {
    setLoopSpeed(BASE_STANDARD_LOOP_SPEED / DESINTEGRATION);
    initializeBoard();
    start();
  }, [start]);

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
        setLoopSpeed(BASE_STANDARD_LOOP_SPEED / DESINTEGRATION);
        return;
      }

      const removed = settleBlock();
      const reward = removed.reduce((a, b) => a + calculateReward(b), 0);
      incPlayerScore(reward);
      incPlayerLines(removed.length);

      const hasLost = nextRound(0, renderedBoard);
      if (hasLost) endGame(true);

      setLoopSpeed(BASE_STANDARD_LOOP_SPEED / DESINTEGRATION);
      setIsSettling(false);
    } else if (hasCollision) {
      setIsSettling(true);
      setLoopSpeed(BASE_COLLISION_LOOP_SPEED / DESINTEGRATION);
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
          setLoopSpeed(BASE_FASTDROP_LOOP_SPEED / DESINTEGRATION);
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
          setLoopSpeed(BASE_STANDARD_LOOP_SPEED / DESINTEGRATION);
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

const calculateReward = (removed: number): number => {
  const { DESINTEGRATION, BOARD_COLS } = powderConfig;
  const lineEquivalent = Math.pow(DESINTEGRATION, 2) * BOARD_COLS;

  if (removed >= lineEquivalent * 4) {
    return 4 * removed;
  } else if (removed >= lineEquivalent * 3) {
    return 2.5 * removed;
  } else if (removed >= lineEquivalent * 2) {
    return 1.5 * removed;
  } else {
    return removed;
  }
};