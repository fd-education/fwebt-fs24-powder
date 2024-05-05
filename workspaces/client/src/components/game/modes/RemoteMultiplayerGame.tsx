import { GameProgress } from '../../../domain/game/gameProgress';
import { useGameStateStore } from '../../../domain/state/gameStateStore';
import React, { useEffect, useState } from 'react';
import { useWebsocketStore } from '../../../domain/state/websocketStateStore';
import {
  BoardStateVars,
  useBoardStateStore,
} from '../../../domain/state/boardState/boardStateStore';
import { usePlayerStore } from '../../../domain/state/playerNameStore';
import { usePlayerGame, useRemoteOpponentGame } from '../../../hooks/useGame';
import { ScoreState, useScoreStore } from '../../../domain/state/scoreStore';
import { MultiplayerBoard } from './MultiplayerBoard';
import { GameProps } from '../../../pages/Game';
import { Waiting } from '../Waiting';
import { GameProgressStates } from '@powder/common';
import { Guide } from '../Guide';

// Eine allgemein interessante Frage: Was, wenn der Screen <1700px ist (und das Gameboard nicht mehr vollständig Platz hat)?
// Ist Responsiveness sinnvoll / mäglich (z.B. mit skaliertem Spielfeld, o.ä.)? Gerade Smartphone-fähig ist das Spiel aktuell gar nicht.
// -> darf auch eine bewusste Abgrenzung sein!
export const RemoteMultiplayerGame = ({ difficulty }: GameProps) => {
  const { playerName } = usePlayerStore();
  const { startGame: startPlayerGame } = usePlayerGame(difficulty);
  const { startGame: startRemoteOpponentGame } =
    useRemoteOpponentGame(difficulty);
  const [opponentDisconnected, setOpponentDisconnected] = useState(false);

  const {
    isConnected,
    emitGameChallenge,
    emitGameProgress,
    registerGameStartHandler,
    registerGameStateHandler,
    registerGameDisconnectHandler,
    registerGameScoreHandler,
    registerGameProgressHandler,
    removeGameHandlers,
  } = useWebsocketStore();
  const { applyState } = useBoardStateStore(true);
  const { applyGameProgress } = useGameStateStore(true);
  const { clearScores: clearPlayerScores } = useScoreStore(false);
  const { clearScores: clearOpponentScores, applyScore } = useScoreStore(true);

  const [waiting, setIsWaiting] = useState(true);
  const [ready, setReady] = useState(false);


  useEffect(() => {
    if (!ready) return;

    clearPlayerScores();
    clearOpponentScores();

    if (!isConnected) return;

    emitGameChallenge({
      name: playerName,
      difficulty,
    });

    registerGameStartHandler(() => {
      setIsWaiting(false);
      startPlayerGame(true);
      startRemoteOpponentGame(true);
    });

    registerGameStateHandler((state: Partial<BoardStateVars>) => {
      applyState(state);
    });

    registerGameDisconnectHandler(() => {
      setOpponentDisconnected(true);
    });

    registerGameScoreHandler((score: Partial<ScoreState>) => {
      applyScore(score);
    });

    registerGameProgressHandler((progress: GameProgress) => {
      applyGameProgress(progress);
    });

    return () => {
      removeGameHandlers();
    };
  }, [ready]);

  const stopWaiting = () => {
    emitGameProgress(GameProgressStates.ended);
  }

  return (
    <>
      {!ready && (
        <Guide readyHandler={() => setReady(true)} />
      )}
      {ready && waiting && <Waiting stopHandler={stopWaiting} />}
      <MultiplayerBoard
        isRemote={true}
        opponentDisconnected={opponentDisconnected}
      />
    </>
  );
};
