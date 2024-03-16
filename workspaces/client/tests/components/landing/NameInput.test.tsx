import { NameInput } from '@/src/components/landing/NameInput';
import { usePlayerNameStore } from '@/src/domain/state/playerNameStore';
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
    usePlayerNameStore.setState({
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

    expect(screen.getByText("What's your name?")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('enter your name')).toBeInTheDocument();
    expect(screen.getByText('continue')).toBeInTheDocument();
  });

  it('Should take player name as input', async () => {
    render(<NameInput />);

    const input = 'testPlayer';
    await userEvent.type(
      await screen.findByPlaceholderText('enter your name'),
      input
    );
  });

  it('Should set playername in store', async () => {
    render(<RouterProvider router={testRouter} />);

    const input = 'testPlayer';
    await userEvent.type(
      await screen.findByPlaceholderText('enter your name'),
      input
    );
    await userEvent.click(await screen.findByText('continue'));
    expect(mockedSetPlayerName).toHaveBeenCalledWith(input);
    expect(mockedUseNavigate).toHaveBeenCalledWith('/lobby');
  });

  it('Should not set empty empty playername in store', async () => {
    render(<NameInput />);

    await userEvent.click(await screen.findByText('continue'));
    expect(mockedSetPlayerName).not.toHaveBeenCalled();
    expect(mockedUseNavigate).not.toHaveBeenCalled();
  });
});
