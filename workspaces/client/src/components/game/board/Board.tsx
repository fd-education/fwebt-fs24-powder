import React from 'react';
import { Panel } from '../../util/Panel';
import { BoardType } from '../../../domain/enums/BlockName';
import { Cell } from './Cell';

interface BoardProps {
  state: BoardType;
}

export const Board = ({state}: BoardProps) => {

  return (
    <Panel>
      <div>
        {state.map((row, ri) => (
          <div key={ri} className='flex'>
            {row.map((cell, ci) => (
              <Cell key={`${ri}-${ci}`} cellType={cell} />
            ))}
          </div>
        ))}
      </div>
    </Panel>
  );
};
