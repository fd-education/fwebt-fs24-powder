import React from 'react';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';
import { PowderButton } from '../util/PowderButton';
import { useNavigate } from 'react-router-dom';

export const GameOptions = () => {
  const navigate = useNavigate();

  const playSinglePlayer = () => {
    navigate('/game');
  };

  const playLocalMultiplayer = () => {
    console.warn('Local multiplayer to be implemented');
    navigate('/game');
  };

  const playRemoteMultiplayer = () => {
    console.warn('Remote multiplayer to be implemented');
    navigate('/game');
  };

  return (
    <Panel>
      <div className='space-y-8'>
        <div className='flex flex-col items-center space-y-2'>
          <PanelHeading text='Singleplayer' />
          <PowderButton text='play' clickHandler={playSinglePlayer} />
        </div>
        <div className='flex flex-col items-center space-y-2'>
          <PanelHeading text='Multiplayer' />
          <div className='space-x-6'>
            <PowderButton text='local' clickHandler={playLocalMultiplayer} />
            <PowderButton text='remote' clickHandler={playRemoteMultiplayer} />
          </div>
        </div>
      </div>
    </Panel>
  );
};
