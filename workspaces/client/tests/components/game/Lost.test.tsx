import { Lost } from '@/src/components/game/Lost';
import { usePlayerScoreStore } from '@/src/domain/state/scoreStore';
import { render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('@/src/components/game/BackHomeButton.tsx', () => ({
  BackHomeButton: () => <div></div>,
}));

describe('Lost component: interface', () => {
  beforeAll(() => {
    usePlayerScoreStore.setState({
      lines: 999,
      score: 1111,
    });
  });

  it('Should render the lost game popup', () => {
    render(<Lost />);

    expect(screen.getByText('you lost! :(')).toBeInTheDocument();
    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('Lines')).toBeInTheDocument();
  });

  it('Should render the scores and lines', () => {
    render(<Lost />);

    expect(screen.getAllByTestId('number-display').length).toBe(2);
    expect(
      screen.getByText(usePlayerScoreStore.getState().lines.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(usePlayerScoreStore.getState().score.toString())
    ).toBeInTheDocument();
  });
});
