import { useGameStateStore } from '../../../domain/state/gameStateStore';
import React, { useEffect, useState } from 'react';
import { SettingsGroup } from '../../settings/SettingsGroup';
import { Title, TitleSize } from '../../util/Title';
import { End } from '../End';
import { Pause } from '../Pause';
import { PopupUnderlay } from '../PopupUnderlay';
import { Board } from '../board/Board';
import { Preview } from '../preview/Preview';
import { Score } from '../score/Score';
import { usePlayerGame } from '../../../hooks/useGame';
import { useScoreStore } from '../../../domain/state/scoreStore';
import { Lost } from '../Lost';
import { GameProps } from '../../../pages/Game';
import { GameProgressStates } from '@powder/common';
import { Guide } from '../Guide';

export const SinglePlayerGame = ({ difficulty }: GameProps) => {
  const { progress } = useGameStateStore(false);

  const { startGame: startPlayerGame } = usePlayerGame(difficulty);
  const { clearScores: clearPlayerScores } = useScoreStore(false);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if(!ready) return;

    clearPlayerScores();
    startPlayerGame();
  }, [ready]);

  return (
    <>
      {!ready && <Guide readyHandler={() => setReady(true)}/>}
      {progress === GameProgressStates.lost && <Lost />}
      <div className='h-full flex flex-col justify-start content-center gap-48'>
        <Title size={TitleSize.SMALL} />
        <Score />
      </div>
      <div className='relative h-full flex flex-col justify-center items-center'>
        <div className='h-full flex flex-row'>
          <Board />
        </div>
        <SettingsGroup />
        {progress !== GameProgressStates.started && <PopupUnderlay />}
        {progress === GameProgressStates.ended && <End />}
        {progress === GameProgressStates.paused && <Pause />}
      </div>
      <div className='h-full flex flex-col justify-center items-center'>
        <Preview />
      </div>
    </>
  );
};
