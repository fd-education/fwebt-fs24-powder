import { ScoreboardTable } from '@/src/components/lobby/scoreboard/ScoreboardTable';
import { ScoreResponse } from '@powder/common';
import { getByText, render, screen } from '@testing-library/react';
import React from 'react';

describe('ScoreboardTable component: interface', () => {
  const ranking: ScoreResponse[] = [];

  beforeAll(() => {
    ranking.push(
      {
        id: '1',
        name: 'Test1',
        score: 3000,
        timestamp: '',
      },
      {
        id: '2',
        name: 'Test2',
        score: 2000,
        timestamp: '',
      },
      {
        id: '3',
        name: 'Test3',
        score: 1000,
        timestamp: '',
      }
    );
  });

  it('Should render scoreboard', () => {
    render(<ScoreboardTable scoreboard={ranking} />);

    expect(screen.getByText(ranking[0].name)).toBeInTheDocument();
    expect(screen.getByText(ranking[0].score)).toBeInTheDocument();
    expect(screen.getByText(ranking[1].name)).toBeInTheDocument();
    expect(screen.getByText(ranking[1].score)).toBeInTheDocument();
    expect(screen.getByText(ranking[2].name)).toBeInTheDocument();
    expect(screen.getByText(ranking[2].score)).toBeInTheDocument();
  });
});
