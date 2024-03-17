import { End } from '@/src/components/game/End';
import { useScoreStore } from '@/src/domain/state/scoreStore';
import { render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('@/src/components/game/BackHomeButton.tsx', () => ({
  BackHomeButton: () => <div></div>,
}));

describe('End component: interface', () => {
  beforeAll(() => {
    useScoreStore.setState({
      playerLines: 888,
      playerScore: 2222,
    });
  });

  it('Should render the end game popup', () => {
    render(<End />);

    expect(screen.getByText('you gave up?! :(')).toBeInTheDocument();
    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('Lines')).toBeInTheDocument();
  });

  it('Should render the scores and lines', () => {
    render(<End />);

    expect(screen.getAllByTestId('number-display').length).toBe(2);
    expect(
      screen.getByText(useScoreStore.getState().playerLines.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(useScoreStore.getState().playerScore.toString())
    ).toBeInTheDocument();
  });
});
