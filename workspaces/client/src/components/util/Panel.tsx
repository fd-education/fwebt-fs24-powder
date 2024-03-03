import React from 'react';
import { BaseProps } from '../../domain/types/BaseProps';

export const Panel = (props: BaseProps) => {
  return (
    <div
      className={`h-fit w-fit py-8 px-16 bg-primary-light dark:bg-primary-dark border-4 border-primary-dark dark:border-primary-light flex flex-col items-center shadow shadow-primary-dark dark:shadow-primary-light`}
    >
      {props.children}
    </div>
  );
};
