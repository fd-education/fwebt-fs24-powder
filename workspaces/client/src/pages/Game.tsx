import React, { useEffect, useState } from 'react';
import { usePlayerGame, useLocalOpponentGame } from '../hooks/useGame';
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
  // In Bezug zum Kommentar unten, hättest du das Problem hier gelöst (conditional call eines Hooks)
  // Hooks sollten in derselben Reihenfolge bei jedem Render und nicht innerhalb von Loops aufgerufen werden in einer Komponente.
  const { startGame: startOpponentGame } =
    gameMode === GameMode.LOCAL_MULTI && useLocalOpponentGame();
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
        /*
          In Bezug auf Software-Architektur würde ich hier hinterfragen:
          - Ist die Sequenz wichtig? -> Falls ja, dann müsste die Sequenz gekapselt sein (eine Funktion/Methode sollte nicht abhängig davon sein, dass der Nutzer eine andere Funktion vorher aufgerufen hat)
            -> initGame(gameMode) im State?
          - Liesse sich pro Spielmodus eine einzelne Komponente schreiben (1 Komponente - 1 Aufgabe)
         */

        setIsMultiplayerGame(true);
        clearPlayerScores();
        clearOpponentScores();
        startPlayerGame();
        startOpponentGame();
        break;
      case GameMode.REMOTE_MULTI:
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
