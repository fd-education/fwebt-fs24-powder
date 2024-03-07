import React from 'react';

export enum TitleSize {
  BIG = 'big',
  SMALL = 'small',
}

interface TitleProps {
  size: TitleSize;
}

export const Title = ({ size }: TitleProps) => {
  return (
    <div>
      <h1
        className={`font-blocked ${size === TitleSize.BIG ? 'text-[10rem] mb-20' : 'text-7xl mb-8'} text-primary-dark dark:text-primary-light leading-3 mt-32`}
      >
        POWDER
      </h1>
      <h2
        className={`font-blocked ${size === TitleSize.BIG ? 'text-3xl' : 'text-2xl'} text-primary-dark dark:text-primary-light`}
      >
        TETRIS, BUT COOLER ...
      </h2>
    </div>
  );
};
