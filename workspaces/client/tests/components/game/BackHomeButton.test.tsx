import { BackHomeButton } from '@/src/components/game/BackHomeButton';
import { useScoreApi } from '@/src/hooks/useScoreApi';
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

jest.mock('@/src/hooks/useScoreApi');
const mockUseScoreAPI = jest.mocked(useScoreApi);
const mockedSaveScore = jest.fn();
mockUseScoreAPI.mockReturnValue({
  saveScore: mockedSaveScore,
});

describe('BackHomeButton component: interface & behaviour', () => {
  let testRouter: any = null;
  beforeAll(() => {
    const testRouterConfig: RouteObject[] = [
      {
        path: '/',
        element: <BackHomeButton />,
      },
    ];

    testRouter = createMemoryRouter(testRouterConfig, {
      initialEntries: ['/'],
    });
  });

  afterEach(() => {
    mockedUseNavigate.mockReset();
    mockedSaveScore.mockReset();
  });

  it('Should save current score and go home', async () => {
    render(<RouterProvider router={testRouter} />);

    await userEvent.click(await screen.findByText('game.back_home'));

    expect(mockedSaveScore).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith('/lobby');
  });
});
