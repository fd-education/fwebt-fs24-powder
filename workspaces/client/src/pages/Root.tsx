import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { usePlayerNameStore } from '../domain/state/playerNameStore';

export const RootPage = () => {
  const { playerName } = usePlayerNameStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (playerName) {
      // TODO Navigate to Lobby
      navigate('/game');
    } else {
      navigate('/landing');
    }
  }, []);

  return (
    <div className='h-full w-full py-8 px-5'>
      <Outlet />
    </div>
  );
};
