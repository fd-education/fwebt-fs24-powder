import { Lost } from '@/src/components/game/Lost';
import { usePlayerScoreStore } from '@/src/domain/state/scoreStore';
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

jest.mock('@/src/components/game/BackHomeButton.tsx', () => ({
  BackHomeButton: () => <div></div>,
}));

describe('Lost component: interface', () => {
  beforeAll(() => {
    usePlayerScoreStore.setState({
      lines: 999,
      score: 1111,
    });
  });

  it('Should render the lost game popup', () => {
    render(<Lost />);

    expect(tSpy).toHaveBeenCalledWith('game.lost');
    expect(tSpy).toHaveBeenCalledWith('game.score');
    expect(tSpy).toHaveBeenCalledWith('game.lines');
  });

  it('Should render the scores and lines', () => {
    render(<Lost />);

    expect(screen.getAllByTestId('number-display').length).toBe(2);
    expect(
      screen.getByText(usePlayerScoreStore.getState().lines.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(usePlayerScoreStore.getState().score.toString())
    ).toBeInTheDocument();
  });
});
