import React from 'react';

interface ScoreboardCellProps {
  text: string;
}

export const ScoreboardCell = ({ text }: ScoreboardCellProps) => {
  return (
    <td className='py-1 dark:text-primary-light text-primary-dark'>
      <p className='text-lg truncate text-center text-ellipsis max-w-56'>
        {text}
      </p>
    </td>
  );
};
