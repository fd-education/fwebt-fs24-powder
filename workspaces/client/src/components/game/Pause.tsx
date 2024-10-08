import React from 'react';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';
import { PowderButton } from '../util/PowderButton';
import { useGameStateStore } from '../../domain/state/gameStateStore';
import { useWebsocketStore } from '../../domain/state/websocketStateStore';
import { useTranslation } from 'react-i18next';
import { GameProgressStates } from '@powder/common';

interface PauseProps {
  isOpponent?: boolean;
  isRemote?: boolean;
}

export const Pause = ({ isOpponent = false, isRemote = false }: PauseProps) => {
  const { continueGame: cont } = useGameStateStore(isOpponent);
  const { emitGameProgress } = useWebsocketStore();
  const { t } = useTranslation();

  const continueGame = () => {
    cont();
    if (isRemote) emitGameProgress(GameProgressStates.started);
  };

  return (
    <div className='h-fit w-fit absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20'>
      <Panel transparent={false} width='w-fit'>
        <div className='flex flex-col items-center space-y-8'>
          <PanelHeading text={t('game.paused')} />
          {!isOpponent && (
            <PowderButton
              text={t('game.continue')}
              clickHandler={() => continueGame()}
            />
          )}
        </div>
      </Panel>
    </div>
  );
};
