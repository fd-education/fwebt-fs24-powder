import React from 'react';

interface PowderButtonProps {
  text: string;
  style?: string;
  clickHandler: () => void;
  isActive?: boolean;
}

// Ein sehr gutes Beispiel für sinnvolle & gut angwendete Abstraktion!
export const PowderButton = ({
  text,
  style,
  clickHandler,
  isActive = false,
}: PowderButtonProps) => {
  return (
    <button
      className={`${isActive ? 'bg-button-color-active' : 'bg-button-color'} ${isActive && 'shadow-inner'} hover:bg-button-color-active hover:shadow-inner text-primary-dark dark:text-primary-light px-4 py-1 border-2 border-primary-dark dark:border-primary-light ${style}`}
      onClick={clickHandler}
    >
      {text}
    </button>
  );
};
