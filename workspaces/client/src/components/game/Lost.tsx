import { usePlayerStore } from '../../domain/state/playerNameStore';
import {
  useScoreStore
} from '../../domain/state/scoreStore';
import React from 'react';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';
import { BackHomeButton } from './BackHomeButton';
import { NumberDisplay } from './score/NumberDisplay';
import { useTranslation } from 'react-i18next';

interface PlayerLostProps {
  isMultiplayer?: boolean;
  isOpponent?: boolean;
}

export const Lost = ({ isMultiplayer = false, isOpponent = false }: PlayerLostProps) => {
  const { score, lines } = useScoreStore(isOpponent);
  const { playerName } = usePlayerStore();
  const {t} = useTranslation();

  return (
    <div className='w-fit h-fit absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center z-20'>
      <Panel transparent={false} width='w-fit'>
        <div className='flex flex-col items-center space-y-8'>
          {!isMultiplayer && <PanelHeading text={t('game.lost')} />}
          {isMultiplayer && (
            <PanelHeading
              text={`${isOpponent ? t('game.opponent') : playerName} ${t('game.has_lost')}`}
            />
          )}
          <div className='flex space-x-12'>
            <div>
              <PanelHeading text={t('game.score')} />
              <NumberDisplay number={score} />
            </div>
            <div>
              <PanelHeading text={t('game.lines')} />
              <NumberDisplay number={lines} />
            </div>
          </div>
          {!isOpponent && <BackHomeButton />}
        </div>
      </Panel>
    </div>
  );
};
