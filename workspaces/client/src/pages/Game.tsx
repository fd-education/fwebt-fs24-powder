import React, { useEffect, useState } from 'react';
import { Board } from '../components/game/board/Board';
import { Score } from '../components/game/score/Score';
import { Preview } from '../components/game/preview/Preview';
import { SettingsGroup } from '../components/settings/SettingsGroup';
import { useOpponentGame, usePlayerGame } from '../hooks/useGame';
import { useGameStateStore } from '../domain/state/gameStateStore';
import { Pause } from '../components/game/Pause';
import { Lost } from '../components/game/Lost';
import { End } from '../components/game/End';
import { Title, TitleSize } from '../components/util/Title';
import {
  useOpponentScoreStore,
  usePlayerScoreStore,
} from '../domain/state/scoreStore';
import { GameProgressStates } from '../domain/game/gameProgress';
import { useSearchParams } from 'react-router-dom';
import { GameMode } from '../domain/enums/GameMode';

export const GamePage = () => {
  const [searchParams, _] = useSearchParams();
  const gameMode = searchParams.get('mode');

  const { startGame: startPlayerGame } = usePlayerGame();
  // prevent event listeners for opponent controls from being added in single player or remote multiplayer mode
  const { startGame: startOpponentGame } =
    gameMode === GameMode.LOCAL_MULTI && useOpponentGame();
  const { progress } = useGameStateStore();
  const { clearScores: clearPlayerScores } = usePlayerScoreStore();
  const { clearScores: clearOpponentScores } = useOpponentScoreStore();
  const [isMultiplayerGame, setIsMultiplayerGame] = useState(false);

  useEffect(() => {
    switch (gameMode) {
      case GameMode.SINGLE:
        console.log('Starting single player');
        clearPlayerScores();
        startPlayerGame();
        break;
      case GameMode.LOCAL_MULTI:
        console.warn('Local Multiplayer to be implemented');
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
        startPlayerGame();
        break;
    }
  }, []);

  return (
    <div className='h-full w-full flex justify-center gap-16'>
      {progress === GameProgressStates.paused && <Pause />}
      {progress === GameProgressStates.lost && <Lost />}
      {progress === GameProgressStates.ended && <End />}
      {!isMultiplayerGame && <SinglePlayerGame />}
      {isMultiplayerGame && <MultiplayerGame />}
    </div>
  );
};

export const SinglePlayerGame = () => {
  return (
    <>
      <div className='h-full flex flex-col justify-start content-center gap-48'>
        <Title size={TitleSize.SMALL} />
        <Score />
      </div>
      <div className='h-full flex flex-col justify-center items-center'>
        <div className='flex flex-row'>
          <Board />
        </div>
        <SettingsGroup />
      </div>
      <div className='h-full flex flex-col justify-center items-center'>
        <Preview />
      </div>
    </>
  );
};

export const MultiplayerGame = () => {
  return (
    <>
      <div className='h-full flex flex-col justify-center items-center'>
        <div className='flex flex-row space-x-16'>
          <div className='flex flex-row space-x-2'>
            <div className='flex flex-col justify-between'>
              <Preview isOpponentPreview={true} />
              <Score isOpponentScore={true} />
            </div>
            <Board isOpponentBoard={true} />
          </div>
          <div className='flex flex-row space-x-2'>
            <Board />
            <div className='flex flex-col justify-between'>
              <Preview />
              <Score />
            </div>
          </div>
        </div>
        <SettingsGroup />
      </div>
      {/* <div className='h-full flex flex-col justify-center items-center'></div> */}
    </>
  );
};
