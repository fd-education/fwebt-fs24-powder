import { useCallback, useEffect, useState } from 'react';
import { useInterval } from './useInterval';
import { powderConfig } from '../domain/config/PowderConfig';
import { ScoreState, useOpponentScoreStore, usePlayerScoreStore } from '../domain/state/scoreStore';
import { useGameStateStore } from '../domain/state/gameStateStore';
import { BoardState, useBoardStateStore, useOpponentBoardStateStore } from '../domain/state/boardState/boardStateStore';
import { checkCollisions } from '../domain/game/blockPhysics';
import { GameProgressStates } from '../domain/game/gameProgress';
import { KeyMap, opponentKeyMap, playerKeyMap } from '../domain/game/keyMaps';

const {
  DESINTEGRATION,
  BASE_STANDARD_LOOP_SPEED,
  BASE_COLLISION_LOOP_SPEED,
  BASE_FASTDROP_LOOP_SPEED,
} = powderConfig;

const useGame = (boardStateStore: BoardState, scoreStore: ScoreState, keyMap: KeyMap) => {
  const { incScore, incLines } = scoreStore;
  const { startGame: start, progress, endGame } = useGameStateStore();
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
  } = boardStateStore;

  const [loopSpeed, setLoopSpeed] = useState<number | null>(null);

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
      incScore(reward);
      incLines(removed.length);

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
    if (progress !== GameProgressStates.started) return;
    gameLoop();
  }, loopSpeed);

  useEffect(() => {
    console.log('Adding Event Listener ', keyMap.accelerate);

    if (progress !== GameProgressStates.started) return;

    const handleKeyDownEvent = (e: KeyboardEvent) => {
      if (progress !== GameProgressStates.started || e.repeat) return;

      switch (e.key) {
        case keyMap.accelerate:
          setLoopSpeed(BASE_FASTDROP_LOOP_SPEED / DESINTEGRATION);
          break;
        case keyMap.rotate:
          rotateBlock();
          break;
        case keyMap.moveRight:
          moveBlockRight();
          break;
        case keyMap.moveLeft:
          moveBlockLeft();
          break;
      }
    };

    const handleKeyUpEvent = (e: KeyboardEvent) => {
      if (progress !== GameProgressStates.started || e.repeat) return;

      switch (e.key) {
        case keyMap.accelerate:
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
  }, [progress, renderedBoard, loopSpeed, checkCollisions, isSettling]);

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

export const usePlayerGame = () => useGame(useBoardStateStore(), usePlayerScoreStore(), playerKeyMap);
export const useOpponentGame = () => useGame(useOpponentBoardStateStore(), useOpponentScoreStore(), opponentKeyMap);
