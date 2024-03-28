import { Preview } from '@/src/components/game/preview/Preview';
import { GameProgressStates } from '@/src/domain/game/gameProgress';
import {
  getPreviewBlocks,
  getRandomBlock,
  useBoardStateStore,
} from '@/src/domain/state/boardStateStore';
import { useGameStateStore } from '@/src/domain/state/gameStateStore';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Preview component: interface & behaviour', () => {
  const previewBlocks = [getRandomBlock()];

  beforeAll(() => {
    useBoardStateStore.setState({
      nextBlockShapes: getPreviewBlocks(previewBlocks),
    });

    useGameStateStore.setState({
      progress: GameProgressStates.started,
    });
  });

  it('Should render title', () => {
    render(<Preview />);
    expect(screen.getByText('Up next')).toBeInTheDocument();
  });

  it('Should render preview blocks', () => {
    render(<Preview />);

    const firstBlockCells = screen.getAllByTestId('preview-cell-fill');
    const coloredBlockCount = firstBlockCells.map((c) =>
      c.classList.contains(`bg-powdromino-${previewBlocks[0].color}`)
    ).length;
    const previewBlockCount = previewBlocks[0].shape.reduce(
      (i, r) => i + r.map((c) => c).length,
      0
    );
    expect(coloredBlockCount).toEqual(previewBlockCount);
  });

  it('Should show preview if not paused', () => {
    render(<Preview />);

    const previewCells = screen.getAllByTestId('preview-cell');
    for (const cell of previewCells) {
      expect(cell).not.toHaveClass('invisible');
    }
  });

  it('Should hide preview during pause', () => {
    useGameStateStore.setState({
      progress: GameProgressStates.paused,
    });
    render(<Preview />);

    const previewCells = screen.getAllByTestId('preview-cell');
    for (const cell of previewCells) {
      expect(cell).toHaveClass('invisible');
    }
  });
});
