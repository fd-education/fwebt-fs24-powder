import React from 'react';

interface ScoreboardCellProps {
  text: string;
}

export const ScoreboardCell = ({ text }: ScoreboardCellProps) => {
  return (
    <td className='text-lg text-center py-1 dark:text-primary-light text-primary-dark'>
      {text}
    </td>
  );
};
