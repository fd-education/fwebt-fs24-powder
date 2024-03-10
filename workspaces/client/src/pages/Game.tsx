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
import { useScoreStore } from '../domain/state/scoreStore';
export const GamePage = () => {
  const { startGame } = useGame();
  const { paused, lost, ended } = useGameStateStore();
  const { clearScores } = useScoreStore();

  useEffect(() => {
    clearScores();
    startGame();
  }, []);

  return (
    <div className='h-full w-full flex justify-center gap-16'>
      {paused && <Pause />}
      {ended && lost && <Lost />}
      {ended && !lost && <End />}
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
