import React from 'react';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';
import { PowderButton } from '../util/PowderButton';
import { useNavigate } from 'react-router-dom';
import { GameMode } from '../../domain/enums/GameMode';

export const GameOptions = () => {
  const navigate = useNavigate();

  return (
    <Panel width='w-fit'>
      <div className='space-y-8'>
        <div className='flex flex-col items-center space-y-2'>
          <PanelHeading text='Singleplayer' />
          <PowderButton
            text='play'
            clickHandler={() => navigate(`/game?mode=${GameMode.SINGLE}`)}
          />
        </div>
        <div className='flex flex-col items-center space-y-2'>
          <PanelHeading text='Multiplayer' />
          <div className='space-x-6'>
            <PowderButton
              text='local'
              clickHandler={() =>
                navigate(`/game?mode=${GameMode.LOCAL_MULTI}`)
              }
            />
            <PowderButton
              text='remote'
              clickHandler={() =>
                navigate(`/game?mode=${GameMode.REMOTE_MULTI}`)
              }
            />
          </div>
        </div>
      </div>
    </Panel>
  );
};
