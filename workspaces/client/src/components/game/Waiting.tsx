import React from 'react';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';
import { useTranslation } from 'react-i18next';
import { PopupUnderlay } from './PopupUnderlay';
import { BackHomeButton } from './BackHomeButton';

interface WaitingProps {
  stopHandler: () => void;
}

export const Waiting = ({ stopHandler }: WaitingProps) => {
  const { t } = useTranslation();

  return (
    <>
      <PopupUnderlay />
      <div className='w-fit h-fit absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center z-20'>
        <Panel transparent={false} width='w-fit'>
          <div className='flex flex-col items-center space-y-8'>
            <PanelHeading text={t('game.patient')} />
            <p className='text-primary-dark dark:text-primary-light text-xl text-center'>
              {t('game.waiting')}
            </p>
            <span className='loading loading-bars loading-lg dark:bg-primary-light bg-primary-dark my-16'></span>
            <BackHomeButton cleanup={() => stopHandler()} />
          </div>
        </Panel>
      </div>
    </>
  );
};
