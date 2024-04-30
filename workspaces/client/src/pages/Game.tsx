import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { GameMode } from '../domain/enums/GameMode';
import { SinglePlayerGame } from '../components/game/modes/SinglePlayerGame';
import { RemoteMultiplayerGame } from '../components/game/modes/RemoteMultiplayerGame';
import { LocalMultiplayerGame } from '../components/game/modes/LocalMultiplayerGame';

export const GamePage = () => {
  const [searchParams] = useSearchParams();
  const gameMode = searchParams.get('mode');
  const difficulty = searchParams.get('difficulty');

  return (
    <div className='relative h-full w-full flex justify-center gap-16'>
      {gameMode === GameMode.SINGLE && <SinglePlayerGame />}
      {gameMode === GameMode.LOCAL_MULTI && <LocalMultiplayerGame />}
      {gameMode === GameMode.REMOTE_MULTI && <RemoteMultiplayerGame />}
    </div>
  );
};
