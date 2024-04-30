import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PowderButton } from '../util/PowderButton';
import { useScoreApi } from '../../hooks/useScoreApi';
import { useGameStateStore } from '../../domain/state/gameStateStore';
import { useTranslation } from 'react-i18next';

export const BackHomeButton = () => {
  const navigate = useNavigate();
  const { saveScore } = useScoreApi();
  const { initialiseGame } = useGameStateStore(false);
  const { initialiseGame: initialiseOppGame } = useGameStateStore(true);
  const { t } = useTranslation();

  const handleBackHome = () => {
    saveScore();
    initialiseGame();
    initialiseOppGame();
    navigate('/lobby');
  };

  return (
    <PowderButton
      text={t('game.back_home')}
      clickHandler={() => handleBackHome()}
    />
  );
};
