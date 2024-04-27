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
import { Background } from './components/util/Background';
import { routes } from './domain/routes/Routes';
import './i18n';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <Background>
    <RouterProvider router={router} />
  </Background>
);
