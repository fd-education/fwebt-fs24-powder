import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PowderButton } from '../util/PowderButton';
import { useScoreApi } from '../../hooks/useScoreApi';
import { useGameStateStore } from '../../domain/state/gameStateStore';

export const BackHomeButton = () => {
  const navigate = useNavigate();
  const { saveScore } = useScoreApi();
  const { initialiseGame } = useGameStateStore();

  const handleBackHome = () => {
    saveScore();
    initialiseGame();
    navigate('/lobby');
  };

  return (
    <PowderButton text='back to home' clickHandler={() => handleBackHome()} />
  );
};
