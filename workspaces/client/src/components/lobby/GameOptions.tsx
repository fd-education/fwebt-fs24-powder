import React from 'react';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';
import { PowderButton } from '../util/PowderButton';
import { useNavigate } from 'react-router-dom';

export const GameOptions = () => {
  const navigate = useNavigate();

  const playSinglePlayer = () => {
    console.warn('Singleplayer to be implemented');
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
      <PanelHeading text='Singleplayer' />
      <PowderButton text='play' clickHandler={playSinglePlayer} />
      <PanelHeading text='Multiplayer' />
      <div>
        <PowderButton text='local' clickHandler={playLocalMultiplayer} />
        <PowderButton text='remote' clickHandler={playRemoteMultiplayer} />
      </div>
    </Panel>
  );
};
