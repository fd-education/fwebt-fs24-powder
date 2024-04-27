import React from 'react';
import { useTranslation } from 'react-i18next';

export enum TitleSize {
  BIG = 'big',
  SMALL = 'small',
}

interface TitleProps {
  size: TitleSize;
}

export const Title = ({ size }: TitleProps) => {
  const {t} = useTranslation();

  return (
    <div>
      <h1
        className={`font-blocked ${size === TitleSize.BIG ? 'text-[10rem] mb-20' : 'text-7xl mb-8'} text-primary-dark dark:text-primary-light leading-3 mt-32`}
      >
        {t("game_title.title")}
      </h1>
      <h2
        className={`font-blocked ${size === TitleSize.BIG ? 'text-3xl' : 'text-2xl'} text-primary-dark dark:text-primary-light`}
      >
        {t("game_title.subtitle")}
      </h2>
    </div>
  );
};
