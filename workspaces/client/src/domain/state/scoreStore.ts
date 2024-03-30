import { create } from 'zustand';

interface ScoreStateVals {
  score: number;
  lines: number;
}
export interface ScoreState extends ScoreStateVals {
  opponentScore: number;
  opponentLines: number;
  incScore: IncFunction;
  incLines: IncFunction;
  clearScores: () => void;
}

type IncFunction = (inc: number) => void;

const initialState: ScoreStateVals = {
  score: 0,
  lines: 0,
};

const scoreStoreDefinition = (
  set: (
    partial:
      | ScoreState
      | Partial<ScoreState>
      | ((state: ScoreState) => ScoreState | Partial<ScoreState>),
    replace?: boolean | undefined
  ) => void
) =>
  ({
    ...initialState,
    incScore: (inc) => {
      set((state) => ({ score: state.score + inc }));
    },
    incLines: (inc) => {
      set((state) => ({ lines: state.lines + inc }));
    },
    clearScores: () => {
      set(() => initialState);
    },
  }) as ScoreState;

export const usePlayerScoreStore = create<ScoreState>(scoreStoreDefinition);
export const useOpponentScoreStore = create<ScoreState>(scoreStoreDefinition);
