import React, { useState } from 'react';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';
import { useNavigate } from 'react-router-dom';
import { usePlayerStore } from '../../domain/state/playerNameStore';
import { v4 as uuidv4 } from 'uuid';

export const NameInput = () => {
  const { setPlayerName, setSessionId } = usePlayerStore();
  const [name, setName] = useState<string>('');

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
      <PanelHeading text={`What's your name?`} />
      <form className='flex flex-col items-center' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='playerName' />
          <input
            className={`bg-white px-2 py-4 text-center my-4 rounded-md`}
            type='text'
            name='playerName'
            placeholder='enter your name'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <input
          className={`bg-button-color text-primary-dark dark:text-primary-light px-4 py-1 border-2 border-primary-dark dark:border-primary-light`}
          type='submit'
          value='continue'
        />
      </form>
    </Panel>
  );
};
