import { PreviewCell } from '@/src/components/game/preview/PreviewCell';
import { BlockColor } from '@/src/domain/blocks/BlockColor';
import { VoidCell } from '@/src/domain/blocks/BlockName';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('PreviewCell component: interface', () => {
  Object.values(BlockColor).forEach((color) => {
    it(`Should handle block color ${color}`, () => {
      render(<PreviewCell type={color} display={true} />);

      expect(screen.getByTestId('preview-cell-fill')).toHaveClass(
        `bg-powdromino-${color}`
      );
    });
  });

  it('Should handle void blocks', () => {
    const testType = VoidCell.VOID;
    render(<PreviewCell type={testType} display={true} />);

    expect(screen.getByTestId('preview-cell-fill')).toHaveClass('invisible');
  });

  it('Should handle display property being false', () => {
    const testType = VoidCell.VOID;
    render(<PreviewCell type={testType} display={false} />);

    expect(screen.getByTestId('preview-cell')).toHaveClass('invisible');
  });

  it('Should handle display property being true', () => {
    const testType = VoidCell.VOID;
    render(<PreviewCell type={testType} display={true} />);

    expect(screen.getByTestId('preview-cell')).not.toHaveClass('invisible');
  });
});
