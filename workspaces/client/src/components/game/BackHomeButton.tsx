import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PowderButton } from '../util/PowderButton';
import { useScoreApi } from '../../hooks/useScoreApi';
import {
  useGameStateStore,
  useOpponentGameStateStore,
} from '../../domain/state/gameStateStore';

export const BackHomeButton = () => {
  const navigate = useNavigate();
  const { saveScore } = useScoreApi();
  const { initialiseGame } = useGameStateStore();
  const { initialiseGame: initialiseOppGame } = useOpponentGameStateStore();

  const handleBackHome = () => {
    saveScore();
    initialiseGame();
    initialiseOppGame();
    navigate('/lobby');
  };

  return (
    <PowderButton text='back to home' clickHandler={() => handleBackHome()} />
  );
};
