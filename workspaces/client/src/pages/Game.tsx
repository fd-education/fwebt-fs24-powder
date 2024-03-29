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
  // prevent event listeners for opponent controls from being added in single player mode
  const { startGame: startOpponentGame } =
    gameMode !== GameMode.SINGLE && useOpponentGame();
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
        startOpponentGame();
        break;
    }
  }, []);

  return (
    <div className='h-full w-full flex justify-center gap-16'>
      {progress === GameProgressStates.paused && <Pause />}
      {progress === GameProgressStates.lost && <Lost />}
      {progress === GameProgressStates.ended && <End />}
      <div className='h-full flex flex-col justify-start content-center gap-48'>
        <Title size={TitleSize.SMALL} />
        <Score />
      </div>
      <div className='h-full flex flex-col justify-center items-center'>
        <div className='flex flex-row'>
          {isMultiplayerGame && <Board isOpponentBoard={true} />}
          <Board />
        </div>
        <SettingsGroup />
      </div>
      <div className='h-full flex flex-col justify-center items-center'>
        <Preview />
      </div>
    </div>
  );
};
