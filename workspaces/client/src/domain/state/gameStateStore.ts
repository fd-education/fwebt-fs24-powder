import { create } from 'zustand';
import {
  GameActions,
  GameProgress,
  getNextProgressStep,
} from '../game/gameProgress';
import { GameProgressStates } from '@powder/common';

export interface GameState {
  progress: GameProgress;
  startGame: () => void;
  continueGame: () => void;
  pauseGame: () => void;
  endGame: (hasLost: boolean) => void;
  initialiseGame: () => void;
  applyGameProgress: (state: GameProgress) => void;
}

const gameStateStoreDefinition = (
  set: (
    partial:
      | GameState
      | Partial<GameState>
      | ((state: GameState) => GameState | Partial<GameState>),
    replace?: boolean | undefined
  ) => void
) =>
  ({
    progress: GameProgressStates.initial,
    startGame: () => {
      set((state) => ({
        progress: getNextProgressStep(state.progress, GameActions.start_game),
      }));
    },
    pauseGame: () => {
      set((state) => ({
        progress: getNextProgressStep(state.progress, GameActions.pause_game),
      }));
    },
    continueGame: () => {
      set((state) => ({
        progress: getNextProgressStep(state.progress, GameActions.start_game),
      }));
    },
    endGame: (hasLost: boolean) => {
      set((state) => ({
        progress: hasLost
          ? getNextProgressStep(state.progress, GameActions.lose_game)
          : getNextProgressStep(state.progress, GameActions.end_game),
      }));
    },
    initialiseGame: () => set({ progress: GameProgressStates.initial }),
    applyGameProgress: (progress: GameProgress) => set({ progress }),
  }) as GameState;

export const usePlayerGameStateStore = create<GameState>(
  gameStateStoreDefinition
);
export const useOpponentGameStateStore = create<GameState>(
  gameStateStoreDefinition
);

export const useGameStateStore = (isOpponent: boolean) => {
  if (isOpponent) {
    return useOpponentGameStateStore();
  } else {
    return usePlayerGameStateStore();
  }
};
