import { Score } from '@/src/components/game/score/Score';
import { useGameStateStore } from '@/src/domain/state/gameStateStore';
import { usePlayerScoreStore } from '@/src/domain/state/scoreStore';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { useTranslation } from 'react-i18next';

const mockedPauseGame = jest.fn();
const mockedEndGame = jest.fn();

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

describe('Score component: interface & behaviour', () => {
  beforeAll(() => {
    usePlayerScoreStore.setState({
      lines: 777,
      score: 3333,
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

    expect(tSpy).toHaveBeenCalledWith('game.score');
    expect(tSpy).toHaveBeenCalledWith('game.lines');
    expect(tSpy).toHaveBeenCalledWith('game.pause');
    expect(tSpy).toHaveBeenCalledWith('game.end');
  });

  it('Should display players score and lines', () => {
    render(<Score />);

    expect(screen.getAllByTestId('number-display').length).toBe(2);
    expect(
      screen.getByText(usePlayerScoreStore.getState().lines.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(usePlayerScoreStore.getState().score.toString())
    ).toBeInTheDocument();
  });

  it('Should pause the game on pause click', async () => {
    render(<Score />);

    await userEvent.click(await screen.findByText('game.pause'));
    expect(mockedPauseGame).toHaveBeenCalled();
  });

  it('Should end the game on end click', async () => {
    render(<Score />);

    await userEvent.click(await screen.findByText('game.end'));
    expect(mockedEndGame).toHaveBeenCalled();
  });
});
