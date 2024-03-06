import React from 'react';

export const MoonIcon = () => {
  // Du kannst das SVG auch als Datei abspeichern und mit IMG verwenden -> siehe create-creact-app-Template: https://git.ffhs.ch/web-technologien/fwebt/fs24/infp-w-af004-fwebt_pibs-be-1-pva/pva-3-apod-template/-/blob/9f95b1a1d85e31ccb83bbee74f1886caf753b9c9/src/App.js
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      className='fill-black h-7'
      viewBox='0 0 16 16'
    >
      <path d='M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278' />
    </svg>
  );
};
