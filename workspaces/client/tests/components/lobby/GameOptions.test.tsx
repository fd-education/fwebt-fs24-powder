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

  it('Should offer all game options', () => {
    render(<GameOptions />);

    expect(screen.getByText('Singleplayer')).toBeInTheDocument();
    expect(screen.getByText('play')).toBeInTheDocument();
    expect(screen.getByText('Multiplayer')).toBeInTheDocument();
    expect(screen.getByText('local')).toBeInTheDocument();
    expect(screen.getByText('remote')).toBeInTheDocument();
  });

  it('Should start singleplayer mode', async () => {
    render(<RouterProvider router={testRouter} />);

    await userEvent.click(await screen.findByText('play'));
    expect(mockedUseNavigate).toHaveBeenCalledWith('/game');
  });
});
