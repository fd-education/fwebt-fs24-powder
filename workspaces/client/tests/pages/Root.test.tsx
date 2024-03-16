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
import { usePlayerNameStore } from '@/src/domain/state/playerNameStore';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
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
    useScreenModeStore.setState({ screenMode: ScreenMode.DARK });
    renderRootPage();
    expect(document.documentElement.classList.contains('dark')).toBeTruthy();
  });

  it('Should manage light screen mode', () => {
    useScreenModeStore.setState({ screenMode: ScreenMode.LIGHT });
    renderRootPage();
    expect(document.documentElement.classList.contains('dark')).toBeFalsy();
  });

  it('Should direct to landing based on username absence', () => {
    usePlayerNameStore.setState({ playerName: '' });
    renderRootPage();
    expect(mockedUseNavigate).toHaveBeenCalledWith('/landing');
  });

  it('Should direct to lobby based on username existance', () => {
    usePlayerNameStore.setState({ playerName: 'test' });
    renderRootPage();
    expect(mockedUseNavigate).toHaveBeenCalledWith('/lobby');
  });
});
