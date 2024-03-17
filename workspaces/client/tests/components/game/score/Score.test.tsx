import { Score } from '@/src/components/game/score/Score';
import { useGameStateStore } from '@/src/domain/state/gameStateStore';
import { useScoreStore } from '@/src/domain/state/scoreStore';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

const mockedPauseGame = jest.fn();
const mockedEndGame = jest.fn();

describe('Score component: interface & behaviour', () => {
  beforeAll(() => {
    useScoreStore.setState({
      playerLines: 777,
      playerScore: 3333,
    });

    useGameStateStore.setState({
      pauseGame: mockedPauseGame,
      endGame: mockedEndGame,
    });
  });

  afterEach(() => {
    mockedPauseGame.mockReset();
    mockedEndGame.mockReset();
  });

  it('Should render score panel', () => {
    render(<Score />);

    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('Lines')).toBeInTheDocument();
    expect(screen.getByText('pause')).toBeInTheDocument();
    expect(screen.getByText('end')).toBeInTheDocument();
  });

  it('Should display players score and lines', () => {
    render(<Score />);

    expect(screen.getAllByTestId('number-display').length).toBe(2);
    expect(
      screen.getByText(useScoreStore.getState().playerLines.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(useScoreStore.getState().playerScore.toString())
    ).toBeInTheDocument();
  });

  it('Should pause the game on pause click', async () => {
    render(<Score />);

    await userEvent.click(await screen.findByText('pause'));
    expect(mockedPauseGame).toHaveBeenCalled();
  });

  it('Should end the game on end click', async () => {
    render(<Score />);

    await userEvent.click(await screen.findByText('end'));
    expect(mockedEndGame).toHaveBeenCalled();
  });
});
