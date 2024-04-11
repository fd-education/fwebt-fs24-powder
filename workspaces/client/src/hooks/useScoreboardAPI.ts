import { useEffect, useState } from 'react';
import { powderConfig } from '../domain/config/PowderConfig';
import { usePlayerStore } from '../domain/state/playerNameStore';
import { ScoreboardResponse } from '@powder/common';

export const useScoreboardApi = () => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<ScoreboardResponse>();

  const { playerName } = usePlayerStore();
  const { SERVER_URL, SCOREBOARD_ENDPOINT } = powderConfig;

  useEffect(() => {
    const url = `${SERVER_URL}/${SCOREBOARD_ENDPOINT}?name=${playerName}`;
    fetch(url, {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }

        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((e: any) => {
        setHasError(true);
        setError(e.message || 'Unexpected error.');
      });
  }, []);

  return {
    loading,
    data,
    hasError,
    error,
  };
};
