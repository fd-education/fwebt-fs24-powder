import { usePlayerNameStore } from '../../domain/state/playerNameStore';
import {
  useOpponentScoreStore,
  usePlayerScoreStore,
} from '../../domain/state/scoreStore';
import React from 'react';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';
import { BackHomeButton } from './BackHomeButton';
import { NumberDisplay } from './score/NumberDisplay';

interface PlayerLostProps {
  isOpponent?: boolean;
}

export const PlayerLost = ({ isOpponent = false }: PlayerLostProps) => {
  const { score, lines } = isOpponent
    ? useOpponentScoreStore()
    : usePlayerScoreStore();
  const { playerName } = usePlayerNameStore();

  return (
    <div className='w-fit h-fit absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center z-20'>
      <Panel transparent={false} width='w-fit'>
        <div className='flex flex-col items-center space-y-8'>
          <PanelHeading
            text={`${isOpponent ? 'guest' : playerName} lost! :(`}
          />
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
