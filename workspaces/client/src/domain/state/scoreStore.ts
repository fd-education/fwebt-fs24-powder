import { create } from 'zustand';

interface ScoreState {
  playerScore: number;
  playerLines: number;
  opponentScore: number;
  opponentLines: number;
  incPlayerScore: IncFunction;
  incPlayerLines: IncFunction;
  incOpponentScore: IncFunction;
  incOpponentLines: IncFunction;
  clearScores: () => void;
}

type IncFunction = (inc: number) => void;

export const useScoreStore = create<ScoreState>()((set) => ({
  playerScore: 0,
  playerLines: 0,
  opponentScore: 0,
  opponentLines: 0,
  incPlayerScore: (inc) => {
    set((state) => ({ playerScore: state.playerScore + inc }));
  },
  incPlayerLines: (inc) => {
    set((state) => ({ playerLines: state.playerLines + inc }));
  },
  incOpponentScore: (inc) => {
    set((state) => ({ opponentScore: state.opponentScore + inc }));
  },
  incOpponentLines: (inc) => {
    set((state) => ({ opponentLines: state.opponentLines + inc }));
  },
  clearScores: () => {
    set(() => ({
      playerScore: 0,
      playerLines: 0,
      opponentScore: 0,
      opponentLines: 0,
    }));
  },
}));
