import React from 'react';
import { BaseProps } from '../../domain/types/BaseProps';

export const Background = (props: BaseProps) => {
  return (
    <div
      className={`h-dvh w-dvw bg-powder-hills-light dark:bg-powder-hills-dark bg-cover`}
    >
      {props.children}
    </div>
  );
};
