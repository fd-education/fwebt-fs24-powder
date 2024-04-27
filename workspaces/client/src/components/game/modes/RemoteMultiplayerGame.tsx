import { GameProgress } from '../../../domain/game/gameProgress';
import { useOpponentGameStateStore } from '../../../domain/state/gameStateStore';
import React, { useEffect, useState } from 'react';
import { useWebsocketStore } from '../../../domain/state/websocketStateStore';
import {
  BoardStateVars,
  useOpponentBoardStateStore,
} from '../../../domain/state/boardState/boardStateStore';
import { usePlayerStore } from '../../../domain/state/playerNameStore';
import { usePlayerGame, useRemoteOpponentGame } from '../../../hooks/useGame';
import { ScoreState, useScoreStore } from '../../../domain/state/scoreStore';
import { MultiplayerBoard } from './MultiplayerBoard';

export const RemoteMultiplayerGame = () => {
  const { playerName } = usePlayerStore();
  const { startGame: startPlayerGame } = usePlayerGame();
  const { startGame: startRemoteOpponentGame } = useRemoteOpponentGame();
  // const [_, setOpponentName] = useState('');
  const [opponentDisconnected, setOpponentDisconnected] = useState(false);

  const {
    isConnected,
    emitGameChallenge,
    registerGameStartHandler,
    registerGameStateHandler,
    registerGameDisconnectHandler,
    registerGameScoreHandler,
    registerGameProgressHandler,
    removeGameHandlers,
  } = useWebsocketStore();
  const { applyState } = useOpponentBoardStateStore();
  const { applyGameProgress } = useOpponentGameStateStore();
  const { clearScores: clearPlayerScores } = useScoreStore(false);
  const { clearScores: clearOpponentScores, applyScore } = useScoreStore(true);

  useEffect(() => {
    clearPlayerScores();
    clearOpponentScores();

    if (!isConnected) return;

    emitGameChallenge(playerName);

    registerGameStartHandler((opponentName: string) => {
      console.log(opponentName);
      // setOpponentName(opponentName);
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

  return (
    <MultiplayerBoard
      isRemote={true}
      opponentDisconnected={opponentDisconnected}
    />
  );
};
