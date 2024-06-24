import React from 'react';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';
import { useScoreStore } from '../../domain/state/scoreStore';
import { NumberDisplay } from './score/NumberDisplay';
import { BackHomeButton } from './BackHomeButton';
import { useTranslation } from 'react-i18next';

interface EndProps {
  isOpponent?: boolean;
}

export const End = ({ isOpponent }: EndProps) => {
  const { t } = useTranslation();
  const { score, lines, clearScores } = useScoreStore(isOpponent);

  return (
    <div className='h-fit w-fit absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20'>
      <Panel transparent={false} width='w-fit'>
        <div className='flex flex-col items-center space-y-8'>
          <PanelHeading text={t('game.give_up')} />
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
          {!isOpponent && <BackHomeButton cleanup={() => clearScores()} />}
        </div>
      </Panel>
    </div>
  );
};
