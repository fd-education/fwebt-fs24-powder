import { Pause } from '@/src/components/game/Pause';
import { usePlayerGameStateStore } from '@/src/domain/state/gameStateStore';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe('Pause component: interface', () => {
  const mockedContinueGame = jest.fn();

  beforeAll(() => {
    usePlayerGameStateStore.setState({
      continueGame: mockedContinueGame,
    });
  });

  afterEach(() => {
    mockedContinueGame.mockReset();
  });

  const renderPause = () => {
    render(<Pause isOpponent={false} />);
  };

  it('Should render the pause game popup', () => {
    renderPause();

    expect(tSpy).toHaveBeenCalledWith('game.paused');
    expect(tSpy).toHaveBeenCalledWith('game.continue');
  });

  it('Should continue the game', async () => {
    renderPause();

    await userEvent.click(await screen.findByText('game.continue'));
    expect(mockedContinueGame).toHaveBeenCalled();
  });
});
