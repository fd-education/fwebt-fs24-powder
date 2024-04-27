import React, { useEffect } from 'react';
import { LanguageIcon } from '../icons/LanguageIcon';
import { Languages, useLanguageStore } from '../../domain/state/languageStore';

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguageStore();

  useEffect(() => {
    setLanguage(language);
  }, []);

  return (
    <div className='dropdown dropdown-bottom'>
      <div
        tabIndex={0}
        role='button'
        className='flex flex-row space-x-2 bg-transparent border-none shadow-none m-1 '
      >
        <LanguageIcon />
        <p className='dark:text-white text-black'>
          {language === Languages.ENG ? 'ENG' : 'GER'}
        </p>
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content bg-none z-[1] menu p-2 rounded-box w-52'
      >
        {language !== Languages.ENG && (
          <LanguageOption text='ENG' handler={() => setLanguage(Languages.ENG)} />
        )}
        {language !== Languages.GER && (
          <LanguageOption text='GER' handler={() => setLanguage(Languages.GER)}/>
        )}
      </ul>
    </div>
  );
};


interface LanguageOptionProps {
  text: string,
  handler: () => void,
}

const LanguageOption = ({text, handler}: LanguageOptionProps) => {
  return (
    <li className='dropdown-open max-w-max'>
      <a
        className='dark:text-white text-black'
        onClick={() => handler()}
      >
        {text}
      </a>
    </li>
  );
}
