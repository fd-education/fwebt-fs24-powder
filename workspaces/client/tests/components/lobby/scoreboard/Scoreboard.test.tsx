import { Scoreboard } from '@/src/components/lobby/scoreboard/Scoreboard';
import { useScoreboardApi } from '@/src/hooks/useScoreboardApi';
import { ScoreResponse } from '@powder/common';
import { render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('@/src/hooks/useScoreboardApi');
const mockUseScoreboardAPI = jest.mocked(useScoreboardApi);

describe('Scoreboard component: interface & behaviour', () => {
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

  it('Should handle loading', () => {
    mockUseScoreboardAPI.mockReturnValue({
      loading: true,
      data: null,
      hasError: false,
      error: '',
    });
    render(<Scoreboard />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('Should handle error', () => {
    const error = 'Test error';
    mockUseScoreboardAPI.mockReturnValue({
      loading: false,
      data: null,
      hasError: true,
      error,
    });
    render(<Scoreboard />);

    expect(screen.getByTestId('error')).toBeInTheDocument();
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('Should handle data', () => {
    mockUseScoreboardAPI.mockReturnValue({
      loading: false,
      data: {
        ranking,
      },
      hasError: false,
      error: '',
    });
    render(<Scoreboard />);

    expect(screen.getByTestId('scoreboard-table')).toBeInTheDocument();
  });
});
