import { Board } from '@/src/components/game/board/Board';
import { powderConfig } from '@/src/domain/config/PowderConfig';
import { GameProgressStates } from '@/src/domain/game/gameProgress';
import {
  getEmptyBoard,
  useBoardStateStore,
} from '@/src/domain/state/boardStateStore';
import { useGameStateStore } from '@/src/domain/state/gameStateStore';
import { render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('@/src/domain/config/PowderConfig');
const mockPowderConfig = jest.mocked(powderConfig);

describe('Board component: interface & behaviour', () => {
  it('Should render board', () => {
    useBoardStateStore.setState({
      renderedBoard: getEmptyBoard(),
    });
    render(<Board />);

    const { BOARD_ROWS, BOARD_COLS, DESINTEGRATION } = mockPowderConfig;
    expect(screen.getAllByTestId('board-cell').length).toBe(
      BOARD_ROWS * BOARD_COLS * DESINTEGRATION ** 2
    );
  });

  it('Should not display board if paused', () => {
    useGameStateStore.setState({ progress: GameProgressStates.paused });
    render(<Board />);

    const boardCells = screen.getAllByTestId('board-cell');
    boardCells.forEach((c) => expect(c).toHaveClass('invisible'));
  });

  it('Should display board if not paused', () => {
    useGameStateStore.setState({ progress: GameProgressStates.started });
    render(<Board />);

    const boardCells = screen.getAllByTestId('board-cell');
    boardCells.forEach((c) => expect(c).not.toHaveClass('invisible'));
  });
});
