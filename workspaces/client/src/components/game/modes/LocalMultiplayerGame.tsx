import React, { useEffect } from 'react';
import { useLocalOpponentGame, usePlayerGame } from '../../../hooks/useGame';
import { useScoreStore } from '../../../domain/state/scoreStore';
import { MultiplayerBoard } from './MultiplayerBoard';
import { GameProps } from '../../../pages/Game';

export const LocalMultiplayerGame = ({difficulty}: GameProps) => {
  const { startGame: startPlayerGame } = usePlayerGame(difficulty);
  const { startGame: startOpponentGame } = useLocalOpponentGame(difficulty);
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
