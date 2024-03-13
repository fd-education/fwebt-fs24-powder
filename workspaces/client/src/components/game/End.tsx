import React from 'react';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';
import { PowderButton } from '../util/PowderButton';
import { useNavigate } from 'react-router-dom';
import { useScoreStore } from '../../domain/state/scoreStore';
import { NumberDisplay } from './score/NumberDisplay';

export const End = () => {
  const navigate = useNavigate();
  const { playerScore, playerLines } = useScoreStore();

  return (
    <div className='h-full w-full fixed top-0 left-0  bg-primary-light-trans7 dark:bg-primary-dark-trans7 flex items-center justify-center'>
      <Panel transparent={false}>
        <div className='flex flex-col items-center space-y-8'>
          <PanelHeading text='you gave up?! :(' />
          <div className='flex space-x-12'>
            <div>
              <PanelHeading text='Score' />
              <NumberDisplay number={playerScore} />
            </div>
            <div>
              <PanelHeading text='Lines' />
              <NumberDisplay number={playerLines} />
            </div>
          </div>
          <PowderButton
            text='back to home'
            clickHandler={() => navigate('/lobby')}
          />
        </div>
      </Panel>
    </div>
  );
};
