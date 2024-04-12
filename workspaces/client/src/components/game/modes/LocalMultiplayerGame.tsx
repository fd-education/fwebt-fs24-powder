import React, { useEffect } from 'react';
import { useLocalOpponentGame, usePlayerGame } from '../../../hooks/useGame';
import {
  useOpponentScoreStore,
  usePlayerScoreStore,
} from '../../../domain/state/scoreStore';
import { MultiplayerBoard } from './MultiplayerBoard';

export const LocalMultiplayerGame = () => {
  const { startGame: startPlayerGame } = usePlayerGame();
  const { startGame: startOpponentGame } = useLocalOpponentGame();
  const { clearScores: clearPlayerScores } = usePlayerScoreStore();
  const { clearScores: clearOpponentScores } = useOpponentScoreStore();

  useEffect(() => {
    clearPlayerScores();
    clearOpponentScores();
    startPlayerGame();
    startOpponentGame();
  }, []);

  return <MultiplayerBoard isRemote={false} />;
};
