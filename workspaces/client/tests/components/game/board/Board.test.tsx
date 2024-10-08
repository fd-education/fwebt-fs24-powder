import { Board } from '@/src/components/game/board/Board';
import { usePlayerGameStateStore } from '@/src/domain/state/gameStateStore';
import { GameProgressStates } from '@powder/common';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Board component: interface & behaviour', () => {
  it('Should not display board if paused', () => {
    usePlayerGameStateStore.setState({ progress: GameProgressStates.paused });
    render(<Board />);

    const boardCanvas = screen.getByTestId('board-canvas');
    expect(boardCanvas).toHaveClass('invisible');
  });

  it('Should display board if not paused', () => {
    usePlayerGameStateStore.setState({ progress: GameProgressStates.started });
    render(<Board />);

    const boardCanvas = screen.getByTestId('board-canvas');
    expect(boardCanvas).not.toHaveClass('invisible');
  });
});
