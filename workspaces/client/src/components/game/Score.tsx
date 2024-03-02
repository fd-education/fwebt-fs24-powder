import React from 'react';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';
import { PowderButton } from '../util/PowderButton';

export const Score = () => {
  const pauseGame = () => {
    console.warn('Pause Game to be done.');
  };

  const endGame = () => {
    console.warn('End Game to be done.');
  };

  return (
    <Panel>
      <PanelHeading text='Score' />
      <PanelHeading text='Lines' />
      <PowderButton text='pause' clickHandler={pauseGame} />
      <PowderButton text='end' clickHandler={endGame} />
    </Panel>
  );
};
