import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { usePlayerNameStore } from '../domain/state/playerNameStore';

export const RootPage = () => {
  const {playerName} =  usePlayerNameStore();
  const navigate = useNavigate();

  useEffect(() => {
    if(playerName){
      navigate('/lobby');
    } else {
      navigate('/landing');
    }
  },[])

  return (
    <>
      <Outlet />
    </>
  );
};
