import React from 'react';
import { Panel } from '../../util/Panel';
import { PanelHeading } from '../../util/PanelHeading';
import { BoardType } from '../../../domain/enums/PowdrominoTypes';
import { Cell } from '../board/Cell';

interface PreviewProps {
  previewBoard: BoardType;
}

export const Preview = ({previewBoard}: PreviewProps) => {

  return (
    <Panel>
      <PanelHeading text='Up next' />
      <div>
        {previewBoard && previewBoard.map((row, ri) => (
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


