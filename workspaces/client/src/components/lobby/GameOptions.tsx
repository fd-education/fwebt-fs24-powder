import React from 'react';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';
import { PowderButton } from '../util/PowderButton';
import { useNavigate } from 'react-router-dom';
import { GameMode } from '../../domain/enums/GameMode';
import { useTranslation } from 'react-i18next';

export const GameOptions = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();

  return (
    <Panel width='w-fit'>
      <div className='space-y-8'>
        <div className='flex flex-col items-center space-y-2'>
          <PanelHeading text={t('lobby.single_player')} />
          <PowderButton
            text={t('lobby.play')}
            clickHandler={() => navigate(`/game?mode=${GameMode.SINGLE}`)}
          />
        </div>
        <div className='flex flex-col items-center space-y-2'>
          <PanelHeading text={t('lobby.multi_player')} />
          <div className='space-x-6'>
            <PowderButton
              text={t('lobby.local')}
              clickHandler={() =>
                navigate(`/game?mode=${GameMode.LOCAL_MULTI}`)
              }
            />
            <PowderButton
              text={t('lobby.remote')}
              clickHandler={() =>
                navigate(`/game?mode=${GameMode.REMOTE_MULTI}`)
              }
            />
          </div>
        </div>
      </div>
    </Panel>
  );
};
