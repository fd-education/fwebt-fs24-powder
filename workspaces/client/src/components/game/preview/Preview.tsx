import React from 'react';
import { Panel } from '../../util/Panel';
import { PanelHeading } from '../../util/PanelHeading';
import { PreviewCell } from './PreviewCell';
import { useGameStateStore } from '../../../domain/state/gameState';

export const Preview = () => {
  const { nextBlockShapes, paused } = useGameStateStore();

  return (
    <Panel height='min-h-[50%]'>
      <PanelHeading text='Up next' />
      <div className='h-full flex flex-col-reverse justify-around'>
        {nextBlockShapes &&
          nextBlockShapes.map((blocks, bi) => (
            <div key={bi}>
              {blocks.map((row, ri) => (
                <div key={ri} className='flex'>
                  {row.map((cell, ci) => (
                    <PreviewCell
                      key={`${ri}-${ci}`}
                      cellType={cell}
                      display={!paused}
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
      </div>
    </Panel>
  );
};
