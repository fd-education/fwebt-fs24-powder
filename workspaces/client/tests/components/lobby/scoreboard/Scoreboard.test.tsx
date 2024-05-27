import { Scoreboard } from '@/src/components/lobby/scoreboard/Scoreboard';
import { useScoreboardStore } from '@/src/domain/state/scoreboardState';
import { ScoreResponse } from '@powder/common';
import { render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('@/src/hooks/useScoreboardApi');

describe('Scoreboard component: interface & behaviour', () => {
  const ranking: ScoreResponse[] = [
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
    },
  ];

  it('Should handle loading', () => {
    useScoreboardStore.setState({
      loading: true,
      success: false,
      error: false,
      scoreboard: [],
      errorData: '',
      fetchScoreboard: jest.fn(),
    });
    render(<Scoreboard />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('Should handle error', () => {
    const error = 'Test error';
    useScoreboardStore.setState({
      loading: false,
      success: false,
      error: true,
      scoreboard: [],
      errorData: error,
      fetchScoreboard: jest.fn(),
    });
    render(<Scoreboard />);

    expect(screen.getByTestId('error')).toBeInTheDocument();
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('Should handle data', () => {
    useScoreboardStore.setState({
      loading: false,
      success: true,
      error: false,
      scoreboard: ranking,
      errorData: '',
      fetchScoreboard: jest.fn(),
    });
    render(<Scoreboard />);

    expect(screen.getByTestId('scoreboard-table')).toBeInTheDocument();
  });
});
