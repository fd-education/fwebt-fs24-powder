import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlayerNameState {
  playerName: string;
  sessionId: string;
  setPlayerName: (playerName: string) => void;
  setSessionId: (sessionId: string) => void;
}

export const usePlayerStore = create<PlayerNameState>()(
  persist(
    (set) => ({
      playerName: '',
      sessionId: '',
      setPlayerName: (playerName) => {
        set({ playerName });
      },
      setSessionId: (sessionId: string) => {
        set({ sessionId: sessionId})
      }
    }),
    {
      name: 'player',
    }
  )
);
