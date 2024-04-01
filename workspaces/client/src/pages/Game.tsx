import React, { useEffect, useState } from 'react';
import { useOpponentGame, usePlayerGame } from '../hooks/useGame';
import {
  useOpponentScoreStore,
  usePlayerScoreStore,
} from '../domain/state/scoreStore';
import { useSearchParams } from 'react-router-dom';
import { GameMode } from '../domain/enums/GameMode';
import { MultiplayerGame } from '../components/game/MultiplayerGame';
import { SinglePlayerGame } from '../components/game/SinglePlayerGame';

export const GamePage = () => {
  const [searchParams] = useSearchParams();
  const gameMode = searchParams.get('mode');

  const { startGame: startPlayerGame } = usePlayerGame();
  // prevent event listeners for opponent controls from being added in single player or remote multiplayer mode
  const { startGame: startOpponentGame } =
    gameMode === GameMode.LOCAL_MULTI && useOpponentGame();
  const { clearScores: clearPlayerScores } = usePlayerScoreStore();
  const { clearScores: clearOpponentScores } = useOpponentScoreStore();
  const [isMultiplayerGame, setIsMultiplayerGame] = useState(false);

  useEffect(() => {
    switch (gameMode) {
      case GameMode.SINGLE:
        clearPlayerScores();
        startPlayerGame();
        break;
      case GameMode.LOCAL_MULTI:
        setIsMultiplayerGame(true);
        clearPlayerScores();
        clearOpponentScores();
        startPlayerGame();
        startOpponentGame();
        break;
      case GameMode.REMOTE_MULTI:
        console.warn('Remote Multiplayer to be implemented.');
        setIsMultiplayerGame(true);
        clearPlayerScores();
        clearOpponentScores();
        break;
    }
  }, []);

  return (
    <div className='relative h-full w-full flex justify-center gap-16'>
      {!isMultiplayerGame && <SinglePlayerGame />}
      {isMultiplayerGame && (
        <MultiplayerGame isRemote={gameMode === GameMode.REMOTE_MULTI} />
      )}
    </div>
  );
};
