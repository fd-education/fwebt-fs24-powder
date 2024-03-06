import React, { useEffect } from 'react';
import { TitleSmall } from '../components/util/TitleSmall';
import { Board } from '../components/game/board/Board';
import { Score } from '../components/game/score/Score';
import { Preview } from '../components/game/preview/Preview';
import { SettingsGroup } from '../components/settings/SettingsGroup';
import { useGame } from '../hooks/useGame';

export const GamePage = () => {
  const { board, startGame, previewBlocks } = useGame();

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className='h-full w-full flex justify-center gap-16'>
      <div className='h-full flex flex-col justify-start content-center gap-48'>
        <TitleSmall />
        <Score />
      </div>
      <div className='h-full flex flex-col justify-center items-center'>
        <Board state={board} />
        <SettingsGroup />
      </div>
      <div className='h-full flex flex-col justify-center items-center'>
        <Preview previewBlocks={previewBlocks} />
      </div>
    </div>
  );
};
