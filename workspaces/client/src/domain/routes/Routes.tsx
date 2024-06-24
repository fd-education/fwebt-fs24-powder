import React from 'react';
import { RouteObject } from 'react-router-dom';
import { ErrorPage } from '../../pages/Error';
import { GamePage } from '../../pages/Game';
import { LandingPage } from '../../pages/Landing';
import { LobbyPage } from '../../pages/Lobby';
import { RootPage } from '../../pages/Root';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'landing',
        element: <LandingPage />,
      },
      {
        path: 'lobby',
        element: <LobbyPage />,
      },
      {
        path: 'game',
        element: <GamePage />,
      },
    ],
  },
];
