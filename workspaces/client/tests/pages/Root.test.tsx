import React from 'react';
import { render } from '@testing-library/react';
import { RootPage } from '@/src/pages/Root';
import {
  RouteObject,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import { ScreenMode } from '@/src/domain/enums/ScreenMode';
import { useScreenModeStore } from '@/src/domain/state/screenModeStore';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

const mockScreenMode = ScreenMode;
const mockUseScreenModeStore = useScreenModeStore;
jest.mock('@/src/domain/state/screenModeStore.ts', () => ({
  useScreenModeStore: () => ({
    ...mockUseScreenModeStore,
    screenMode: mockScreenMode.DARK,
  }),
}));

jest.mock('@/src/domain/state/playerNameStore.ts', () => ({
  usePlayerNameStore: () => ({
    playerName: '',
    setPlayerName: jest.fn(),
  }),
}));

describe('Root page: interface & behaviour', () => {
  let testRouter: any = null;
  beforeAll(() => {
    const testRouterConfig: RouteObject[] = [
      {
        path: '/',
        element: <RootPage />,
      },
    ];

    testRouter = createMemoryRouter(testRouterConfig, {
      initialEntries: ['/'],
    });
  });

  const renderRootPage = () => {
    render(<RouterProvider router={testRouter} />);
  };

  it('Should manage dark screen mode', () => {
    renderRootPage();
    expect(document.documentElement.classList.contains('dark')).toBeTruthy();
  });

  it('Should route based on username existance', () => {
    renderRootPage();
    expect(mockedUseNavigate).toHaveBeenCalledWith('/landing');
  });
});
