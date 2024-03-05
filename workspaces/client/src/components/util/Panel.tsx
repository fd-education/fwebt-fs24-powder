import React from 'react';
import { BaseProps } from '../../domain/types/BaseProps';

interface PanelProps extends BaseProps{
  height?: string;
  width?: string;
}

export const Panel = ({height = 'h-fit', width = 'h-fit', children}: PanelProps) => {
  return (
    <div
      className={`${height} ${width} py-8 px-16 bg-primary-light dark:bg-primary-dark border-4 border-primary-dark dark:border-primary-light flex flex-col items-center shadow shadow-primary-dark dark:shadow-primary-light`}
    >
      {children}
    </div>
  );
};
