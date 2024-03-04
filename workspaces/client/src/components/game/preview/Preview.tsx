import React from 'react';
import { Panel } from '../../util/Panel';
import { PanelHeading } from '../../util/PanelHeading';
import { BoardType } from '../../../domain/enums/PowdrominoTypes';
import { PreviewCell } from './PreviewCell';

interface PreviewProps {
  previewBoard: BoardType;
}

export const Preview = ({previewBoard}: PreviewProps) => {

  return (
    <Panel>
      <PanelHeading text='Up next' />
      <div className='flex flex-col-reverse'>
        {previewBoard && previewBoard.map((row, ri) => (
          <div key={ri} className='flex'>
            {
            row.map((cell, ci) => (
              <PreviewCell key={`${ri}-${ci}`} cellType={cell} />
            ))}
          </div>
        ))}
      </div>
    </Panel>
  );
};


