import { ScoreRequest, ScoreboardResponse } from '@powder/common';
import { usePlayerStore } from '../domain/state/playerNameStore';
import { useScoreStore } from '../domain/state/scoreStore';
import { powderConfig } from '../domain/config/PowderConfig';
import { useScoreboardStore } from '../domain/state/scoreboardState';

export const useScoreApi = () => {
  const { playerName } = usePlayerStore();
  const { score } = useScoreStore(false);
  const { SERVER_URL, SCORE_ENDPOINT } = powderConfig;
  const {setScoreboard} = useScoreboardStore();

  const saveScore = () => {
    if (score === 0) return;

    const payload: ScoreRequest = {
      name: playerName,
      score,
      timestamp: new Date().toISOString(),
    };
    const url = `${SERVER_URL}/${SCORE_ENDPOINT}`;

    postRequest<ScoreRequest, ScoreboardResponse>(url, payload)
    .then((response) => {
      setScoreboard(response.ranking);
    });
  };

  const postRequest = async <T, P>(url: string, payload: T): Promise<P> => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.json() as P;
    } catch (e) {
      console.error(e);
    }
  };

  return {
    saveScore,
  };
};
