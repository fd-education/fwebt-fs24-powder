import React from 'react';
import { LanguageIcon } from '../icons/LanguageIcon';
import { Languages, useLanguageStore } from '../../domain/state/languageStore';

export const LanguageSelector = () => {
  const {language, setLanguage} = useLanguageStore();

  return (
    <div className='dropdown dropdown-bottom'>
      <div
        tabIndex={0}
        role='button'
        className='flex flex-row space-x-2 bg-transparent border-none shadow-none m-1 '
      >
        <LanguageIcon />
        <p className='dark:text-white text-black'>{language === Languages.ENG ? 'ENG' : 'GER'}</p>
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content bg-none z-[1] menu p-2 rounded-box w-52'
      >
        <li className='max-w-max'>
          <a
            className='dark:text-white text-black'
            onClick={() => setLanguage(Languages.ENG)}
          >
            ENG
          </a>
        </li>
        <li className='max-w-max'>
          <a
            className='dark:text-white text-black'
            onClick={() => setLanguage(Languages.GER)}
          >
            GER
          </a>
        </li>
      </ul>
    </div>
  );
};
