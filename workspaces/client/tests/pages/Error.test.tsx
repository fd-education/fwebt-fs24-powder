import React from 'react';
import {
  RouteObject,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@jest/globals';
import '@testing-library/react';
import { ErrorPage } from '../../src/pages/Error';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Error page: interface and behaviour', () => {
  let testRouter: any = null;

  beforeAll(() => {
    const testRouterConfig: RouteObject[] = [
      {
        path: '/',
        element: <div />,
        errorElement: <ErrorPage />,
      },
    ];

    testRouter = createMemoryRouter(testRouterConfig, {
      initialEntries: ['/', '/notexisting'],
    });
  });

  it('Shoud load and display error page', async () => {
    render(<RouterProvider router={testRouter} />);

    expect(screen.getByText('Oopsie!')).toBeTruthy();
    expect(
      screen.getByText('Sorry, an unexpected error has occurred.')
    ).toBeTruthy();
    expect(screen.getByText('Not Found')).toBeTruthy();
    expect(screen.getByText('go back')).toBeTruthy();
  });

  it('Should navigate to the previous page', async () => {
    render(<RouterProvider router={testRouter} />);

    await userEvent.click(screen.getByText('go back'));
    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);

    mockedUseNavigate.mockRestore();
  });
});
