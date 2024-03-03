import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlayerNameState {
  playerName: string;
  setPlayerName: (playerName: string) => void;
}

export const usePlayerNameStore = create<PlayerNameState>()(
  persist(
    (set) => ({
      playerName: '',
      setPlayerName: (playerName) => {
        set({ playerName });
      }
    }),
    {
      name: 'player'
    }
  )
);