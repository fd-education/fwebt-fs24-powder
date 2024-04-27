import { NameInput } from '@/src/components/landing/NameInput';
import { usePlayerStore } from '@/src/domain/state/playerNameStore';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {
  RouteObject,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

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

describe('NameInput component: interface & behaviour', () => {
  const mockedSetPlayerName = jest.fn();

  let testRouter: any = null;
  beforeAll(() => {
    const testRouterConfig: RouteObject[] = [
      {
        path: '/',
        element: <NameInput />,
      },
    ];

    testRouter = createMemoryRouter(testRouterConfig, {
      initialEntries: ['/'],
    });
  });

  beforeEach(() => {
    usePlayerStore.setState({
      playerName: '',
      setPlayerName: (playername: string) => mockedSetPlayerName(playername),
    });
  });

  afterEach(() => {
    mockedSetPlayerName.mockReset();
    mockedUseNavigate.mockReset();
  });

  it('Should render ui components', () => {
    render(<NameInput />);

    expect(tSpy).toHaveBeenCalledWith('name_input.title');
    expect(tSpy).toHaveBeenCalledWith('name_input.input');
    expect(tSpy).toHaveBeenCalledWith('name_input.continue');
  });

  it('Should take player name as input', async () => {
    render(<NameInput />);

    const input = 'testPlayer';
    await userEvent.type(
      await screen.findByPlaceholderText('name_input.input'),
      input
    );
  });

  it('Should set playername in store', async () => {
    render(<RouterProvider router={testRouter} />);

    const input = 'testPlayer';
    await userEvent.type(
      await screen.findByPlaceholderText('name_input.input'),
      input
    );
    await userEvent.click(await screen.findByText('name_input.continue'));
    expect(mockedSetPlayerName).toHaveBeenCalledWith(input);
    expect(mockedUseNavigate).toHaveBeenCalledWith('/lobby');
  });

  it('Should not set empty empty playername in store', async () => {
    render(<NameInput />);

    await userEvent.click(await screen.findByText('name_input.continue'));
    expect(mockedSetPlayerName).not.toHaveBeenCalled();
    expect(mockedUseNavigate).not.toHaveBeenCalled();
  });
});
