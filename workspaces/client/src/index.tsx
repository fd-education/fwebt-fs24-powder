import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootPage } from './pages/Root'
import { ErrorPage } from './pages/Error'
import { LandingPage } from './pages/Landing'
import { MenuPage } from './pages/Menu'
import { GamePage } from './pages/Game'

import './style.css'

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
        path: 'menu',
        element: <MenuPage />,
      },
      {
        path: 'game',
        element: <GamePage />,
      }
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
