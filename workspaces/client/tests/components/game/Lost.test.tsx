import { Lost } from '@/src/components/game/Lost';
import { useScoreStore } from '@/src/domain/state/scoreStore';
import { render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('@/src/components/game/BackHomeButton.tsx', () => ({
  BackHomeButton: () => <div></div>,
}));

describe('Lost component: interface', () => {
  beforeAll(() => {
    useScoreStore.setState({
      playerLines: 999,
      playerScore: 1111,
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
      screen.getByText(useScoreStore.getState().playerLines.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(useScoreStore.getState().playerScore.toString())
    ).toBeInTheDocument();
  });
});
