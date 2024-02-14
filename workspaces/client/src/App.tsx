import React from 'react';
import {TestEnum} from '@powder/common';

export const App = () => {

  return (
    <>
      <div className='bg-black'>{TestEnum.ONE}</div>
      <button className='btn btn-success h-max w-max'>I'm a test button</button>
    </>
  );
}
