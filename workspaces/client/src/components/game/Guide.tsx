import React from 'react';
import { PopupUnderlay } from './PopupUnderlay';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';
import { useTranslation } from 'react-i18next';
import { PowderButton } from '../util/PowderButton';

interface GuideProps {
  readyHandler: () => void;
  isLocalMultiplayer?: boolean;
}

export const Guide = ({
  readyHandler,
  isLocalMultiplayer = false,
}: GuideProps) => {
  const { t } = useTranslation();

  const playerControls = ['▲', '◀︎', '▼', '▶︎'];
  const opponentControls = ['w', 'a', 's', 'd'];

  return (
    <>
      <PopupUnderlay />
      <div className='w-fit h-fit absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center z-20'>
        <Panel transparent={false} width='w-fit'>
          <div className='flex flex-col items-center space-y-8'>
            <PanelHeading text={t('game.controls')} />
            <div className='flex flex-row space-x-32 items-center text-primary-dark dark:text-primary-light text-l text-center'>
              {isLocalMultiplayer && <Controls controls={opponentControls} />}
              <Controls controls={playerControls} />
            </div>
            <PowderButton
              text={t('game.ready')}
              clickHandler={() => readyHandler()}
            />
          </div>
        </Panel>
      </div>
    </>
  );
};

interface ControlsProps {
  controls: string[];
}

const Controls = ({ controls }: ControlsProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className='whitespace-pre-line'>{t('game.rotate')}</div>
      <div className='flex flex-row'>
        <div className='whitespace-pre-line self-end'>{t('game.left')}</div>
        <div className='flex flex-col m-1'>
          <div>
            <kbd className='kbd w-min' data-cy='rotate'>
              {controls[0]}
            </kbd>
          </div>
          <div className='flex flex-row justify-center'>
            <kbd className='kbd w-min h-min' data-cy='left'>
              {controls[1]}
            </kbd>
            <kbd className='kbd w-min h-min' data-cy='drop'>
              {controls[2]}
            </kbd>
            <kbd className='kbd w-min h-min' data-cy='right'>
              {controls[3]}
            </kbd>
          </div>
        </div>
        <div className='whitespace-pre-line self-end'>{t('game.right')}</div>
      </div>
      <div className='whitespace-pre-line'>{t('game.drop')}</div>
    </div>
  );
};
