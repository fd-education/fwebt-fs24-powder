import React, { useEffect } from 'react';
import { useLocalOpponentGame, usePlayerGame } from '../../../hooks/useGame';
import { useScoreStore } from '../../../domain/state/scoreStore';
import { MultiplayerBoard } from './MultiplayerBoard';

export const LocalMultiplayerGame = () => {
  const { startGame: startPlayerGame } = usePlayerGame();
  const { startGame: startOpponentGame } = useLocalOpponentGame();
  const { clearScores: clearPlayerScores } = useScoreStore(false);
  const { clearScores: clearOpponentScores } = useScoreStore(true);

  useEffect(() => {
    clearPlayerScores();
    clearOpponentScores();
    startPlayerGame();
    startOpponentGame();
  }, []);

  return <MultiplayerBoard isRemote={false} />;
};
