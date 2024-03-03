import React from 'react';
import './style.css';
import './fonts/Blocked/blocked.ttf';
import './fonts/Blocked/blocked.woff';
import './fonts/Blocked/blocked.woff2';
import './fonts/RobotoMono/robotomono.ttf';
import './fonts/RobotoMono/robotomono.woff';
import './fonts/RobotoMono/robotomono.woff2';

import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootPage } from './pages/Root';
import { ErrorPage } from './pages/Error';
import { LandingPage } from './pages/Landing';
import { LobbyPage } from './pages/Lobby';
import { GamePage } from './pages/Game';
import { Background } from './components/util/Background';

const router = createBrowserRouter([
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
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Background>
      <RouterProvider router={router} />
    </Background>
  </React.StrictMode>
);
