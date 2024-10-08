import React from 'react';
import { Panel } from '../../util/Panel';
import { PanelHeading } from '../../util/PanelHeading';
import { PowderButton } from '../../util/PowderButton';
import { NumberDisplay } from './NumberDisplay';
import { useScoreStore } from '../../../domain/state/scoreStore';
import { useGameStateStore } from '../../../domain/state/gameStateStore';
import { useWebsocketStore } from '../../../domain/state/websocketStateStore';
import { useTranslation } from 'react-i18next';
import { GameProgressStates } from '@powder/common';

interface ScoreProps {
  isOpponentScore?: boolean;
  isRemote?: boolean;
}

export const Score = ({
  isOpponentScore = false,
  isRemote = false,
}: ScoreProps) => {
  const { score, lines } = useScoreStore(isOpponentScore);
  const { pauseGame: pause, endGame: end } = useGameStateStore(isOpponentScore);
  const { emitGameProgress } = useWebsocketStore();
  const { t } = useTranslation();

  const pauseGame = () => {
    pause();
    if (isRemote) emitGameProgress(GameProgressStates.paused);
  };

  const endGame = () => {
    end(false);
    if (isRemote) emitGameProgress(GameProgressStates.ended);
  };

  return (
    <Panel paddingY='py-4'>
      <div className='flex flex-col justify-center space-y-4'>
        <div>
          <PanelHeading text={t('game.score')} />
          <NumberDisplay number={score} />
        </div>
        <div>
          <PanelHeading text={t('game.lines')} />
          <NumberDisplay number={lines} />
        </div>
        {!(isOpponentScore && isRemote) && (
          <PowderButton
            text={t('game.pause')}
            clickHandler={() => pauseGame()}
          />
        )}
        {!(isOpponentScore && isRemote) && (
          <PowderButton text={t('game.end')} clickHandler={() => endGame()} />
        )}
      </div>
    </Panel>
  );
};
