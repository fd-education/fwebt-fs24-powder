import { GameProgressStates } from '../../domain/game/gameProgress';
import {
  useGameStateStore,
  useOpponentGameStateStore,
} from '../../domain/state/gameStateStore';
import React, { useEffect, useState } from 'react';
import { SettingsGroup } from '../settings/SettingsGroup';
import { End } from './End';
import { Pause } from './Pause';
import { PlayerLost } from './PlayerLost';
import { Board } from './board/Board';
import { Preview } from './preview/Preview';
import { Score } from './score/Score';
import { useWebsocketStore } from '../../domain/state/websocketStateStore';
import {
  BoardStateVars,
  useOpponentBoardStateStore,
} from '../../domain/state/boardState/boardStateStore';
import { usePlayerNameStore } from '../../domain/state/playerNameStore';
import { usePlayerGame, useRemoteOpponentGame } from '../../hooks/useGame';

interface MultiplayerGameProps {
  isRemote?: boolean;
}

export const MultiplayerGame = ({ isRemote = false }: MultiplayerGameProps) => {
  const { progress } = useGameStateStore();
  const { progress: opponentProgress } = useOpponentGameStateStore();
  const { playerName } = usePlayerNameStore();
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
    removeGameHandlers,
  } = useWebsocketStore();
  const { applyState } = useOpponentBoardStateStore();

  useEffect(() => {
    if (!isRemote || !isConnected) return;

    emitGameChallenge(playerName);

    registerGameStartHandler((opponentName: string) => {
      console.log('Starting!');
      console.log(opponentName);

      // setOpponentName(opponentName);
      startPlayerGame(true);
      startRemoteOpponentGame(true);
    });

    registerGameStateHandler((state: Partial<BoardStateVars>) => {
      console.log('Applying state');
      applyState(state);
    });

    registerGameDisconnectHandler(() => {
      console.log('Opponent disconnected');
      setOpponentDisconnected(true);
    });

    return () => {
      removeGameHandlers();
    };
  }, []);

  return (
    <>
      <div className='h-full flex flex-col justify-center items-center'>
        <div className='flex flex-row space-x-16'>
          <div className='relative flex flex-row space-x-2'>
            <div className='flex flex-col justify-between'>
              <Preview isOpponentPreview={true} />
              <Score isOpponentScore={true} />
            </div>
            <Board isOpponentBoard={true} />
            {opponentProgress === GameProgressStates.lost && (
              <PlayerLost isOpponent={true} />
            )}
            {opponentProgress === GameProgressStates.paused && (
              <Pause isOpponent={true} />
            )}
            {(opponentDisconnected ||
              opponentProgress === GameProgressStates.ended) && (
              <End isOpponent={true} />
            )}
          </div>
          <div className='relative flex flex-row space-x-2'>
            <Board />
            {progress === GameProgressStates.lost && <PlayerLost />}
            {progress === GameProgressStates.paused && <Pause />}
            {progress === GameProgressStates.ended && <End />}
            <div className='flex flex-col justify-between'>
              <Preview />
              <Score />
            </div>
          </div>
        </div>
        <SettingsGroup />
      </div>
    </>
  );
};
