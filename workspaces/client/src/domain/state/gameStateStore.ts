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
  // Für diese 4 Zustände wär ein Enum gut. Die Zustände sind exklusiv (es können nicht zwei Zustände gleichzeitig aktiv
  // sein. z.B. Pause ist zwar abhängig von Gestartet, jedoch ist Pause nicht möglich, wenn nicht gestartet).
  // Das Enum wurde eine "State machine" beschreiben. -> Initial, Started, Paused, Running, Ended, Lost, Won
  // Da dies jedoch nach einer grösseren Anpassung aussieht, so belassen (von mir aus).
  // -> siehe z.B. die Anwendung im useGame.ts
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
