import React, { useEffect, useState } from 'react';
import { useLocalOpponentGame, usePlayerGame } from '../../../hooks/useGame';
import { useScoreStore } from '../../../domain/state/scoreStore';
import { MultiplayerBoard } from './MultiplayerBoard';
import { GameProps } from '../../../pages/Game';
import { Guide } from '../Guide';

export const LocalMultiplayerGame = ({ difficulty }: GameProps) => {
  const { startGame: startPlayerGame } = usePlayerGame(difficulty);
  const { startGame: startOpponentGame } = useLocalOpponentGame(difficulty);
  const { clearScores: clearPlayerScores } = useScoreStore(false);
  const { clearScores: clearOpponentScores } = useScoreStore(true);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if(!ready) return;

    clearPlayerScores();
    clearOpponentScores();
    startPlayerGame();
    startOpponentGame();
  }, [ready]);

  return (
   <>
    {!ready && <Guide isLocalMultiplayer={true} readyHandler={() => setReady(true)}/>}
    <MultiplayerBoard isRemote={false} />
   </>
);
};
