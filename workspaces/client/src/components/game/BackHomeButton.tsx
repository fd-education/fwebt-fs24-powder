import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PowderButton } from '../util/PowderButton';
import { useScoreApi } from '../../hooks/useScoreApi';
import { useGameStateStore } from '../../domain/state/gameStateStore';
import { useTranslation } from 'react-i18next';

interface BackhomeButtonProps {
  cleanup?: () => void;
}

export const BackHomeButton = ({cleanup = () => {}}: BackhomeButtonProps) => {
  const navigate = useNavigate();
  const { saveScore } = useScoreApi();
  const { initialiseGame } = useGameStateStore(false);
  const { initialiseGame: initialiseOppGame } = useGameStateStore(true);
  const { t } = useTranslation();

  const handleBackHome = () => {
    saveScore();
    initialiseGame();
    initialiseOppGame();
    cleanup();
    navigate('/lobby');
  };

  return (
    <PowderButton
      text={t('game.back_home')}
      clickHandler={() => handleBackHome()}
    />
  );
};
