import React, { useEffect } from 'react';
import { Board } from '../components/game/board/Board';
import { Score } from '../components/game/score/Score';
import { Preview } from '../components/game/preview/Preview';
import { SettingsGroup } from '../components/settings/SettingsGroup';
import { useGame } from '../hooks/useGame';
import { useGameStateStore } from '../domain/state/gameStateStore';
import { Pause } from '../components/game/Pause';
import { Lost } from '../components/game/Lost';
import { End } from '../components/game/End';
import { Title, TitleSize } from '../components/util/Title';
import { usePlayerScoreStore } from '../domain/state/scoreStore';
import { GameProgressStates } from '../domain/game/gameProgress';
import { useSearchParams } from 'react-router-dom';
import { GameMode } from '../domain/enums/GameMode';

export const GamePage = () => {
  const { startGame } = useGame();
  const { progress } = useGameStateStore();
  const { clearScores } = usePlayerScoreStore();
  const [searchParams, _] = useSearchParams();

  useEffect(() => {
    clearScores();
    startGame();

    switch (searchParams.get('mode')) {
      case GameMode.SINGLE:
        console.log('Starting single player');
        break;
      case GameMode.LOCAL_MULTI:
        console.warn('Local Multiplayer to be implemented');
        break;
      case GameMode.REMOTE_MULTI:
        console.warn('Remote Multiplayer to be implemented.');
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
        <Board />
        <SettingsGroup />
      </div>
      <div className='h-full flex flex-col justify-center items-center'>
        <Preview />
      </div>
    </div>
  );
};
