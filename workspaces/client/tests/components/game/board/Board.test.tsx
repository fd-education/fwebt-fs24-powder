import { Board } from '@/src/components/game/board/Board';
import { GameProgressStates } from '@/src/domain/game/gameProgress';
import { useGameStateStore } from '@/src/domain/state/gameStateStore';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Board component: interface & behaviour', () => {
  it('Should not display board if paused', () => {
    useGameStateStore.setState({ progress: GameProgressStates.paused });
    render(<Board />);

    const boardCanvas = screen.getByTestId('board-canvas');
    expect(boardCanvas).toHaveClass('invisible');
  });

  it('Should display board if not paused', () => {
    useGameStateStore.setState({ progress: GameProgressStates.started });
    render(<Board />);

    const boardCanvas = screen.getByTestId('board-canvas');
    expect(boardCanvas).not.toHaveClass('invisible');
  });
});
