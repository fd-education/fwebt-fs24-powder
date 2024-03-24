import { create } from 'zustand';
import { GameActions, GameProgress, GameProgressStates, getNextProgressStep } from '../game/gameProgress';

interface GameState {
  progress: GameProgress;
  startGame: () => void;
  continueGame: () => void;
  pauseGame: () => void;
  endGame: (hasLost: boolean) => void;
  initialiseGame: () => void;
}

export const useGameStateStore = create<GameState>()((set) => ({
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
      progress: hasLost ? getNextProgressStep(state.progress, GameActions.lose_game) : getNextProgressStep(state.progress, GameActions.end_game),
    }));
  },
  initialiseGame: () => set({progress: GameProgressStates.initial})
}));
