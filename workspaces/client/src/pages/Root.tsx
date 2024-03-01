import React from 'react';
import { Outlet } from 'react-router-dom';

export const RootPage = () => {
  return (
    <>
      <h1>This is the root page</h1>
      <Outlet />
    </>
  );
};
