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
    <Panel height='h-[45%]'>
      <PanelHeading text='Up next' />
      <div className='h-full flex flex-col-reverse justify-around'>
        {previewBlocks &&
          previewBlocks.map((blocks, bi) => (
            <div key={bi}>
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
