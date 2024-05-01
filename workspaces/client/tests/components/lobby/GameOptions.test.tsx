import { GameOptions } from '@/src/components/lobby/GameOptions';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {
  RouteObject,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

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

describe('GameOptions component: interface & behaviour', () => {
  let testRouter: any = null;
  beforeAll(() => {
    const testRouterConfig: RouteObject[] = [
      {
        path: '/',
        element: <GameOptions />,
      },
    ];

    testRouter = createMemoryRouter(testRouterConfig, {
      initialEntries: ['/'],
    });
  });

  afterEach(() => {
    mockedUseNavigate.mockReset();
  });

  it('Should offer all game options', () => {
    render(<GameOptions />);

    expect(tSpy).toHaveBeenCalledWith('lobby.single_player');
    expect(tSpy).toHaveBeenCalledWith('lobby.play');
    expect(tSpy).toHaveBeenCalledWith('lobby.multi_player');
    expect(tSpy).toHaveBeenCalledWith('lobby.local');
    expect(tSpy).toHaveBeenCalledWith('lobby.remote');
  });

  it('Should start singleplayer mode', async () => {
    render(<RouterProvider router={testRouter} />);

    await userEvent.click(await screen.findByText('lobby.play'));
    expect(mockedUseNavigate).toHaveBeenCalledWith(
      '/game?mode=singleplayer&difficulty=5'
    );
  });
});
