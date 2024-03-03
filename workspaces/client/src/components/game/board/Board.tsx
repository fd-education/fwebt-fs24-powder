import React from 'react';
import { Panel } from '../../util/Panel';
import { PowdrominoTypes } from '../../../domain/enums/PowdrominoTypes';
import { Cell } from './Cell';

interface BoardProps {
  currentState: PowdrominoTypes[][];
}

export const Board = ({currentState}: BoardProps) => {

  return (
    <Panel>
      <div>
        {
          currentState.map((row, ri) => (
            <div key={ri} className='flex'>
              {row.map((cell, ci) => (
                <Cell key={ci} cellType={cell}/>
              ))}
            </div>
          ))
        }
      </div>
    </Panel>
  );
};
