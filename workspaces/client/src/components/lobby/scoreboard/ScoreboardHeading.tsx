import React from 'react';

interface ScoreboardHeadingProps {
  text: string;
}

export const ScoreboardHeading = ({ text }: ScoreboardHeadingProps) => {
  return (
    <th className='font-blocked text-2xl dark:text-primary-light text-primary-dark px-8 py-2'>
      {text}
    </th>
  );
};
