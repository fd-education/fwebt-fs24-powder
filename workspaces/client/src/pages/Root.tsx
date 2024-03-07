import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { usePlayerNameStore } from '../domain/state/playerNameStore';
import { useScreenModeStore } from '../domain/state/screenModeStore';
import { ScreenMode } from '../domain/enums/ScreenMode.enum';

export const RootPage = () => {
  const { playerName } = usePlayerNameStore();
  const { screenMode } = useScreenModeStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (screenMode === ScreenMode.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    if (playerName) {
      navigate('/lobby');
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
