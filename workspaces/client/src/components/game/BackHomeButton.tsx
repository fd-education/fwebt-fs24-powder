import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PowderButton } from '../util/PowderButton';
import { useScoreApi } from '../../hooks/useScoreApi';

export const BackHomeButton = () => {
  const navigate = useNavigate();
  const { saveScore } = useScoreApi();

  const handleBackHome = () => {
    saveScore();
    navigate('/lobby');
  };

  return (
    <PowderButton text='back to home' clickHandler={() => handleBackHome()} />
  );
};
