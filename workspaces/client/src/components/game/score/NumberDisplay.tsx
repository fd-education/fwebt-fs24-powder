import React from 'react';

interface NumberDisplayProps {
  number: number;
}

export const NumberDisplay = ({ number }: NumberDisplayProps) => {
  return (
    <p className='text-primary-dark dark:text-primary-light text-3xl text-center'>
      {number}
    </p>
  );
};
