import { ScoreResponse } from '@powder/common';
import React from 'react';
import { ScoreboardCell } from './ScoreboardCell';
import { ScoreboardHeading } from './ScoreboardHeading';

interface ScoreboardTableProps {
  scoreboard: ScoreResponse[];
}

export const ScoreboardTable = ({ scoreboard }: ScoreboardTableProps) => {
  return (
    <table className='my-16'>
      <thead>
        <tr>
          <ScoreboardHeading text='Rank' />
          <ScoreboardHeading text='Player' />
          <ScoreboardHeading text='Score' />
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
