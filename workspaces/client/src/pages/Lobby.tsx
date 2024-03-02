import React from 'react';
import { usePlayerNameStore } from '../domain/state/playerNameStore';

export const LobbyPage = () => {

  const {playerName} = usePlayerNameStore();

  return <h1>{`Welcome to the lobby page, ${playerName}!`}</h1>;
};
