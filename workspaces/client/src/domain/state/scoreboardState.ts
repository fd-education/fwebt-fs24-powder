import { ScoreResponse, ScoreboardResponse } from '@powder/common';
import { create } from 'zustand';
import { powderConfig } from '../config/PowderConfig';

interface ScoreboardVars {    
    loading: boolean;
    success: boolean;
    error: boolean;
    scoreboard: ScoreResponse[];
    errorData: string;
}

interface ScoreboardState extends ScoreboardVars {
    setScoreboard: (scoreboard: ScoreResponse[]) => void;
    fetchScoreboard: () => void;
}

const initial: ScoreboardVars = {
    loading: false,
    success: false,
    error: false,
    scoreboard: [],
    errorData: '',
}

const {SERVER_URL, SCOREBOARD_ENDPOINT} = powderConfig;

export const useScoreboardStore = create<ScoreboardState>((set) => ({
    ...initial,
    setScoreboard: (scoreboard: ScoreResponse[]) => {
        set({ scoreboard });
    },
    fetchScoreboard: async () => {
        set({ loading: true });
        try {
            const response = await fetch(`${SERVER_URL}/${SCOREBOARD_ENDPOINT}`);
            if (response.ok) {
                const data = await response.json() as ScoreboardResponse;

                set({ scoreboard: data.ranking, success: true, loading: false });
            } else {
                set({ error: true, loading: false, errorData: 'Error fetching scoreboard'});
            }
        } catch (error) {
            set({ error: true, loading: false, errorData: error.message || 'Error fetching scoreboard' });
        }
    },
}));