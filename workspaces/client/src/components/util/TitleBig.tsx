import React from 'react';

// TitleBig und TitleSmall liessen sich in eine Komponente zusammenführen und parametrisieren (abgesehen von 1 CSS-Klasse dasselbe)
export const TitleBig = () => {
  return (
    <div>
      <h1 className='font-blocked text-[10rem] text-primary-dark dark:text-primary-light leading-3 mt-32 mb-20'>
        POWDER
      </h1>
      <h2 className='font-blocked text-3xl text-primary-dark dark:text-primary-light'>
        TETRIS, BUT COOLER ...
      </h2>
    </div>
  );
}
