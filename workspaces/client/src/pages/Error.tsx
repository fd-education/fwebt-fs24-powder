import React, { useEffect, useState } from 'react';
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';
import { Panel } from '../components/util/Panel';
import { PanelHeading } from '../components/util/PanelHeading';
import { PowderButton } from '../components/util/PowderButton';

export const ErrorPage = () => {
  const error = useRouteError();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  console.error(error);

  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      setErrorMessage(error.data?.message || error.statusText);
    } else if (error instanceof Error) {
      setErrorMessage(error.message);
    } else if (typeof error === 'string') {
      setErrorMessage(error);
    } else {
      // Tipp: Ich brauche auch manchmal console.log / console.error im Code. Diese gehen jedoch schnell mal vergessen, und haben im produktiven Code grundsätzlich nichts zu suchen.
      // Es gibt ein Bable Plugin, der alle console.* entfernt während des Transpilieren -> https://babeljs.io/docs/babel-plugin-transform-remove-console
      console.error(error);
      setErrorMessage('Unknown error');
    }
  }, []);

  return (
    <div className='h-full w-full flex items-center justify-center text-primary-light'>
      <Panel width='w-fit'>
        <div className='flex flex-col items-center space-y-3'>
          <PanelHeading text='Oopsie!' />
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{errorMessage}</i>
          </p>
          <PowderButton text='go back' clickHandler={() => navigate(-1)} />
        </div>
      </Panel>
    </div>
  );
};
