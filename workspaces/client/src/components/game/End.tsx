import React from 'react';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';
import {
  useOpponentScoreStore,
  usePlayerScoreStore,
} from '../../domain/state/scoreStore';
import { NumberDisplay } from './score/NumberDisplay';
import { BackHomeButton } from './BackHomeButton';

interface EndProps {
  isOpponent?: boolean;
}

export const End = ({ isOpponent }: EndProps) => {
  const { score, lines } = isOpponent
    ? useOpponentScoreStore()
    : usePlayerScoreStore();

  return (
    <div className='h-fit w-fit absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20'>
      <Panel transparent={false} width='w-fit'>
        <div className='flex flex-col items-center space-y-8'>
          <PanelHeading text='you gave up?! :(' />
          <div className='flex space-x-12'>
            <div>
              <PanelHeading text='Score' />
              <NumberDisplay number={score} />
            </div>
            <div>
              <PanelHeading text='Lines' />
              <NumberDisplay number={lines} />
            </div>
          </div>
          {!isOpponent && <BackHomeButton />}
        </div>
      </Panel>
    </div>
  );
};
