import { Preview } from '@/src/components/game/preview/Preview';
import { usePlayerBoardStateStore } from '@/src/domain/state/boardState/boardStateStore';
import {
  getPreviewBlocks,
  getRandomBlock,
} from '@/src/domain/state/boardState/boardStateUtils';
import { usePlayerGameStateStore } from '@/src/domain/state/gameStateStore';
import { Difficulty, GameProgressStates } from '@powder/common';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { useTranslation } from 'react-i18next';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

const tSpy = jest.fn((str) => str);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const changeLanguageSpy = jest.fn((lng: string) => new Promise(() => {}));
const useTranslationSpy = useTranslation as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();

  useTranslationSpy.mockReturnValue({
    t: tSpy,
    i18n: {
      changeLanguage: changeLanguageSpy,
      language: 'en',
    },
  });
});

describe('Preview component: interface & behaviour', () => {
  const previewBlocks = [getRandomBlock(Difficulty.NORMAL)];

  beforeAll(() => {
    usePlayerBoardStateStore.setState({
      nextBlockShapes: getPreviewBlocks(previewBlocks),
    });

    usePlayerGameStateStore.setState({
      progress: GameProgressStates.started,
    });
  });

  it('Should render title', () => {
    render(<Preview />);
    expect(tSpy).toHaveBeenCalledWith('game.up_next');
  });

  it('Should show preview if not paused', () => {
    render(<Preview />);

    const previewCanvas = screen.getByTestId('preview-canvas');
    expect(previewCanvas).not.toHaveClass('invisible');
  });

  it('Should hide preview during pause', () => {
    usePlayerGameStateStore.setState({
      progress: GameProgressStates.paused,
    });
    render(<Preview />);

    const previewCanvas = screen.getByTestId('preview-canvas');
    expect(previewCanvas).toHaveClass('invisible');
  });
});
