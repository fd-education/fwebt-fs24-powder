import React, { useState } from 'react';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';
import { useNavigate } from 'react-router-dom';
import { usePlayerStore } from '../../domain/state/playerNameStore';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';

export const NameInput = () => {
  const { setPlayerName, setSessionId } = usePlayerStore();
  const [name, setName] = useState<string>('');
  const {t} = useTranslation();

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!name) {
      console.error('Playername must be specified!');
      return;
    }

    setSessionId(uuidv4());
    setPlayerName(name);
    navigate('/lobby');
  };

  return (
    <Panel>
      <PanelHeading text={t('name_input.title')} />
      <form className='flex flex-col items-center' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='playerName' />
          <input
            className={`bg-white px-2 py-4 text-center my-4 rounded-md`}
            type='text'
            name='playerName'
            placeholder={t('name_input.input')}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <input
          className={`bg-button-color text-primary-dark dark:text-primary-light px-4 py-1 border-2 border-primary-dark dark:border-primary-light`}
          type='submit'
          value={t('name_input.continue')}
        />
      </form>
    </Panel>
  );
};
