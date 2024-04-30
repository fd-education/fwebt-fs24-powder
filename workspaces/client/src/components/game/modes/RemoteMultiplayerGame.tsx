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

  useEffect(() => {
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
  }, []);

  const stopWaiting = () => {
    emitGameProgress(GameProgressStates.ended);
  }

  return (
    <>
      {waiting && <Waiting stopHandler={stopWaiting}/>}
      <MultiplayerBoard
        isRemote={true}
        opponentDisconnected={opponentDisconnected}
      />
    </>
  );
};
