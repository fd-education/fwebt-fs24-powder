import React, { useEffect, useState } from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export const ErrorPage = () => {
  const error = useRouteError();
  const [errorMessage, setErrorMessage] = useState('');
  console.error(error);

  useEffect(() => {
    console.log('Error detected.');

    if (isRouteErrorResponse(error)) {
      setErrorMessage(error.data?.message || error.statusText);
    } else if (error instanceof Error) {
      setErrorMessage(error.message);
    } else if (typeof error === 'string') {
      setErrorMessage(error);
    } else {
      console.error(error);
      setErrorMessage('Unknown error');
    }
  }, [])

  return (
    <>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has ocurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </>
  )
}
