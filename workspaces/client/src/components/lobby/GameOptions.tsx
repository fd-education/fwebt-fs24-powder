import React, { useState } from 'react';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';
import { PowderButton } from '../util/PowderButton';
import { useNavigate } from 'react-router-dom';
import { GameMode } from '../../domain/enums/GameMode';
import { useTranslation } from 'react-i18next';
import { Difficulty } from '@powder/common';

export const GameOptions = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.NORMAL);

  return (
    <Panel width='w-fit'>
      <div className='space-y-8'>
        <div className='flex flex-col items-center space-y-2'>
          <PanelHeading text={t('lobby.difficulty')} />
          <div className='space-x-6'>
            <PowderButton
              text={t('lobby.normal')}
              isActive={difficulty === Difficulty.NORMAL}
              clickHandler={() => setDifficulty(Difficulty.NORMAL)}
            />
            <PowderButton
              text={t('lobby.hard')}
              isActive={difficulty === Difficulty.HARD}
              clickHandler={() => setDifficulty(Difficulty.HARD)}
            />
          </div>
        </div>
        <div className='flex flex-col items-center space-y-2'>
          <PanelHeading text={t('lobby.single_player')} />
          <PowderButton
            text={t('lobby.play')}
            clickHandler={() =>
              navigate(`/game?mode=${GameMode.SINGLE}&difficulty=${difficulty}`)
            }
          />
        </div>
          <div className='flex flex-col items-center space-y-2'>
            <PanelHeading text={t('lobby.multi_player')} />
            <div className='space-x-6'>
              <PowderButton
                text={t('lobby.local')}
                clickHandler={() =>
                  navigate(
                    `/game?mode=${GameMode.LOCAL_MULTI}&difficulty=${difficulty}`
                  )
                }
              />
              <PowderButton
                text={t('lobby.remote')}
                clickHandler={() =>
                  navigate(
                    `/game?mode=${GameMode.REMOTE_MULTI}&difficulty=${difficulty}`
                  )
                }
              />
            </div>
          </div>
        </div>
    </Panel>
  );
};
