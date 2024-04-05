import { ScoreRequest, ScoreResponse } from '@powder/common';
import { usePlayerNameStore } from '../domain/state/playerNameStore';
import { usePlayerScoreStore } from '../domain/state/scoreStore';
import { powderConfig } from '../domain/config/PowderConfig';

export const useScoreApi = () => {
  const { playerName } = usePlayerNameStore();
  const { score } = usePlayerScoreStore();
  const { SERVER_URL, SCORE_ENDPOINT } = powderConfig;

  const saveScore = () => {
    if (score === 0) return;

    const payload: ScoreRequest = {
      name: playerName,
      score,
      timestamp: new Date().toISOString(),
    };
    const url = `${SERVER_URL}/${SCORE_ENDPOINT}`;

    // mit dem "void"-Operator kannst du das Promise explizit "ignorieren"
    // -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void#description
    void postRequest<ScoreRequest, ScoreResponse>(url, payload);
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

      return response as P;
    } catch (e) {
      console.error(e);
    }
  };

  return {
    // Das Promise (ursprünglich von postRequest) ignorierst du hier -> Fehlerbehandlung?
    saveScore,
  };
};
