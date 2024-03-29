import React from 'react';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';
import { usePlayerScoreStore } from '../../domain/state/scoreStore';
import { NumberDisplay } from './score/NumberDisplay';
import { BackHomeButton } from './BackHomeButton';

export const Lost = () => {
  const { score, lines } = usePlayerScoreStore();

  return (
    <div className='h-full w-full fixed top-0 left-0  bg-primary-light-trans7 dark:bg-primary-dark-trans7 flex items-center justify-center'>
      <Panel transparent={false} width='w-fit'>
        <div className='flex flex-col items-center space-y-8'>
          <PanelHeading text='you lost! :(' />
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
          <BackHomeButton />
        </div>
      </Panel>
    </div>
  );
};
