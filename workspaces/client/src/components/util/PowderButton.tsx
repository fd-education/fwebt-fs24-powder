import React from 'react';

interface PowderButtonProps {
  text: string;
  style?: string;
  clickHandler: () => void;
  
}

export const PowderButton = ({text, style, clickHandler}: PowderButtonProps) => {
  return (
    <button className={`bg-button-color text-primary-dark dark:text-primary-light px-4 py-1 border-2 border-primary-dark dark:border-primary-light ${style}`} onClick={clickHandler}>{text}</button>
  )
}