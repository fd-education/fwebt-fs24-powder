import { Pause } from '@/src/components/game/Pause';
import { useGameStateStore } from '@/src/domain/state/gameStateStore';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

describe('Pause component: interface', () => {
  const mockedContinueGame = jest.fn();

  beforeAll(() => {
    useGameStateStore.setState({
      continueGame: mockedContinueGame,
    });
  });

  afterEach(() => {
    mockedContinueGame.mockReset();
  });

  it('Should render the pause game popup', () => {
    render(<Pause />);

    expect(screen.getByText('paused')).toBeInTheDocument();
    expect(screen.getByText('continue')).toBeInTheDocument();
  });

  it('Should continue the game', async () => {
    render(<Pause />);

    await userEvent.click(await screen.findByText('continue'));
    expect(mockedContinueGame).toHaveBeenCalled();
  });
});
