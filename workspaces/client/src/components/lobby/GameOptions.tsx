import React from 'react';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';
import { PowderButton } from '../util/PowderButton';
import { useNavigate } from 'react-router-dom';

export const GameOptions = () => {
  const navigate = useNavigate();

  return (
    <Panel width='w-fit'>
      <div className='space-y-8'>
        <div className='flex flex-col items-center space-y-2'>
          <PanelHeading text='Singleplayer' />
          <PowderButton text='play' clickHandler={() => navigate('/game')} />
        </div>
        <div className='flex flex-col items-center space-y-2'>
          <PanelHeading text='Multiplayer' />
          <div className='space-x-6'>
            <PowderButton
              text='local'
              clickHandler={() =>
                console.warn('Local multiplayer to be implemented')
              }
            />
            <PowderButton
              text='remote'
              clickHandler={() =>
                console.warn('Remote multiplayer to be implemented')
              }
            />
          </div>
        </div>
      </div>
    </Panel>
  );
};
