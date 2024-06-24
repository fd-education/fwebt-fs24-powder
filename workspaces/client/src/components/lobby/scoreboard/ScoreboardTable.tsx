import { ScoreResponse } from '@powder/common';
import React from 'react';
import { ScoreboardCell } from './ScoreboardCell';
import { ScoreboardHeading } from './ScoreboardHeading';
import { useTranslation } from 'react-i18next';
import { useScoreboardStore } from '../../../domain/state/scoreboardState';

export const ScoreboardTable = () => {
  const { t } = useTranslation();
  
  const { scoreboard } = useScoreboardStore();

  return (
    <table data-testid='scoreboard-table' className='table-fixed my-16'>
      <thead>
        <tr>
          <ScoreboardHeading text={t('lobby.rank')} />
          <ScoreboardHeading text={t('lobby.name')} />
          <ScoreboardHeading text={t('lobby.score')} />
        </tr>
      </thead>
      <tbody>
        {scoreboard.length > 0 && scoreboard.map((score: ScoreResponse, rank: number) => (
          <tr key={rank}>
            <ScoreboardCell text={`${rank + 1}`} />
            <ScoreboardCell text={score.name} />
            <ScoreboardCell text={`${score.score}`} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
