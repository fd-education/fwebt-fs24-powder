import { create } from 'zustand';

interface GameState {
  started: boolean;
  paused: boolean;
  ended: boolean;
  lost: boolean;
  startGame: () => void;
  continueGame: () => void;
  pauseGame: () => void;
  endGame: (hasLost: boolean) => void;
}

export const useGameStateStore = create<GameState>()((set) => ({
  started: false,
  paused: false,
  ended: false,
  lost: false,
  startGame: () => {
    set({
      started: true,
      ended: false,
      lost: false,
      paused: false,
    });
  },
  pauseGame: () => {
    set((state) => {
      const invalidState = state.paused || !state.started || state.ended;
      return invalidState ? {} : { paused: true };
    });
  },
  continueGame: () => {
    set((state) => {
      const invalidState = !state.paused || !state.started || state.ended;
      return invalidState ? {} : { paused: false };
    });
  },
  endGame: (hasLost: boolean) => {
    set((state) => {
      const invalidState = !state.started || state.paused || state.ended;
      return invalidState
        ? {}
        : {
            started: false,
            ended: true,
            lost: hasLost,
          };
    });
  },
}));
