import { Preview } from '@/src/components/game/preview/Preview';
import { GameProgressStates } from '@/src/domain/game/gameProgress';
import { useBoardStateStore } from '@/src/domain/state/boardState/boardStateStore';
import {
  getPreviewBlocks,
  getRandomBlock,
} from '@/src/domain/state/boardState/boardStateUtils';
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

  it('Should show preview if not paused', () => {
    render(<Preview />);

    const previewCanvas = screen.getByTestId('preview-canvas');
    expect(previewCanvas).not.toHaveClass('invisible');
  });

  it('Should hide preview during pause', () => {
    useGameStateStore.setState({
      progress: GameProgressStates.paused,
    });
    render(<Preview />);

    const previewCanvas = screen.getByTestId('preview-canvas');
    expect(previewCanvas).toHaveClass('invisible');
  });
});
