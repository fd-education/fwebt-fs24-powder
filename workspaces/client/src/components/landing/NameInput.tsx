import React from 'react';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';

export const NameInput = () => {
  return (
    <Panel>
      <PanelHeading text={`What's your name?`} />
      <form className='flex flex-col items-center'>
        <div>
          <label htmlFor='playerName' />
          <input
            className={`bg-white px-2 py-4 text-center my-4 rounded-md`}
            type='text'
            name='playerName'
            placeholder='enter your name'
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
