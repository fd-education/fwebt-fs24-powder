import React from 'react';
import { Panel } from '../../util/Panel';
import { PanelHeading } from '../../util/PanelHeading';
import { BoardType } from '../../../domain/enums/PowdrominoTypes';
import { PreviewCell } from './PreviewCell';

interface PreviewProps {
  previewBlocks: BoardType[];
}

export const Preview = ({ previewBlocks }: PreviewProps) => {
  return (
    <Panel>
      <PanelHeading text='Up next' />
      <div className='flex flex-col-reverse justify-items-center'>
        {previewBlocks &&
          previewBlocks.map((blocks, bi) => (
            <div key={bi} className='my-2'>
              {blocks.map((row, ri) => (
                <div key={ri} className='flex'>
                  {row.map((cell, ci) => (
                    <PreviewCell key={`${ri}-${ci}`} cellType={cell} />
                  ))}
                </div>
              ))}
            </div>
          ))}
      </div>
    </Panel>
  );
};
