import { create } from 'zustand';

interface ScoreStateVals {
  score: number;
  lines: number;
}
export interface ScoreState extends ScoreStateVals {
  opponentScore: number;
  opponentLines: number;
  incScore: (lines: number, score: number) => void;
  clearScores: () => void;
}

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
    incScore: (incLines: number, incScore: number) => {
      set((state) => ({ lines: state.lines + incLines, score: state.score + incScore }));
    },
    clearScores: () => {
      set(() => initialState);
    },
  }) as ScoreState;

export const usePlayerScoreStore = create<ScoreState>(scoreStoreDefinition);
export const useOpponentScoreStore = create<ScoreState>(scoreStoreDefinition);
