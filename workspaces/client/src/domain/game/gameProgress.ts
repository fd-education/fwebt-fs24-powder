import { GameProgressStates } from '@powder/common';

export enum GameActions {
  start_game = 'start_game',
  pause_game = 'pause_game',
  end_game = 'end_game',
  lose_game = 'lose_game',
}

export type GameProgress = keyof typeof GameProgressStates;
type GameAction = keyof typeof GameActions;

type GameProgressMachine = {
  [progress in GameProgressStates]: {
    [action in GameActions]?: GameProgress;
  };
};

const gameProgressMachine: GameProgressMachine = {
  [GameProgressStates.initial]: {
    [GameActions.start_game]: GameProgressStates.started,
    [GameActions.end_game]: GameProgressStates.ended,
  },
  [GameProgressStates.started]: {
    [GameActions.pause_game]: GameProgressStates.paused,
    [GameActions.end_game]: GameProgressStates.ended,
    [GameActions.lose_game]: GameProgressStates.lost,
  },
  [GameProgressStates.paused]: {
    [GameActions.start_game]: GameProgressStates.started,
  },
  [GameProgressStates.ended]: {},
  [GameProgressStates.lost]: {},
};

export const getNextProgressStep = (
  current: GameProgress,
  action: GameAction
): GameProgress => {
  const next = gameProgressMachine[current][action];
  if (!next) return current;

  return next;
};
