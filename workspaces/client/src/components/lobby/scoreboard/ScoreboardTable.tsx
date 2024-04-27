import { ScoreResponse } from '@powder/common';
import React from 'react';
import { ScoreboardCell } from './ScoreboardCell';
import { ScoreboardHeading } from './ScoreboardHeading';
import { useTranslation } from 'react-i18next';

interface ScoreboardTableProps {
  scoreboard: ScoreResponse[];
}

export const ScoreboardTable = ({ scoreboard }: ScoreboardTableProps) => {
  const { t } = useTranslation();

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
        {scoreboard.map((score: ScoreResponse, rank: number) => (
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
