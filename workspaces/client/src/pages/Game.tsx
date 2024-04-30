import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { GameMode } from '../domain/enums/GameMode';
import { SinglePlayerGame } from '../components/game/modes/SinglePlayerGame';
import { RemoteMultiplayerGame } from '../components/game/modes/RemoteMultiplayerGame';
import { LocalMultiplayerGame } from '../components/game/modes/LocalMultiplayerGame';

export interface GameProps {
  difficulty: number;
}

export const GamePage = () => {
  const [searchParams] = useSearchParams();
  const gameMode = searchParams.get('mode');
  const diff = Number.parseInt(searchParams.get('difficulty'));

  return (
    <div className='relative h-full w-full flex justify-center gap-16'>
      {gameMode === GameMode.SINGLE && <SinglePlayerGame difficulty={diff} />}
      {gameMode === GameMode.LOCAL_MULTI && (
        <LocalMultiplayerGame difficulty={diff} />
      )}
      {gameMode === GameMode.REMOTE_MULTI && (
        <RemoteMultiplayerGame difficulty={diff} />
      )}
    </div>
  );
};
