import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { usePlayerStore } from '../domain/state/playerNameStore';
import { useScreenModeStore } from '../domain/state/screenModeStore';
import { ScreenMode } from '../domain/enums/ScreenMode';
import { useWebsocketStore } from '../domain/state/websocketStateStore';

export const RootPage = () => {
  const { playerName } = usePlayerStore();
  const { screenMode } = useScreenModeStore();
  const { open, close, isConnected } = useWebsocketStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (screenMode === ScreenMode.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    if (!isConnected) {
      open();
    }

    if (playerName) {
      navigate('/lobby');
    } else {
      navigate('/landing');
    }

    return () => {
      close();
    };
  }, []);

  return (
    <div className='h-full w-full py-8 px-5'>
      <Outlet />
    </div>
  );
};
