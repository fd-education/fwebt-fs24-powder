import React, { useEffect } from 'react';
import { TitleSmall } from '../components/util/TitleSmall';
import { Board } from '../components/game/board/Board';
import { Score } from '../components/game/Score';
import { Preview } from '../components/game/preview/Preview';
import { SettingsGroup } from '../components/settings/SettingsGroup';
import { useGame } from '../hooks/useGame';

export const GamePage = () => {
  const { board, start, score, lines, previewBoard } = useGame();

  useEffect(() => {
    start();
  }, []);

  return (
    <div className='h-full w-full flex justify-between'>
      <div className='h-full flex flex-col justify-center'>
        <TitleSmall />
        <Score score={score} lines={lines} />
      </div>
      <div className='h-full flex flex-col justify-center items-center'>
        <Board state={board} />
        <SettingsGroup />
      </div>
      <div className='h-full flex flex-col justify-center'>
        <Preview previewBoard={previewBoard} />
      </div>
    </div>
  );
};
