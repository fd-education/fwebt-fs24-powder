import { Cell } from '@/src/components/game/board/Cell';
import { BlockColor } from '@/src/domain/blocks/BlockColor';
import { VoidCell } from '@/src/domain/blocks/BlockName';
import { Desintegration, powderConfig } from '@/src/domain/config/PowderConfig';
import { render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('@/src/domain/config/PowderConfig');
const mockPowderConfig = jest.mocked(powderConfig);

describe('Cell component: interface & behaviour', () => {
  afterEach(() => jest.restoreAllMocks());

  Object.values(Desintegration)
    .filter((v) => isNaN(Number(v)))
    .forEach((factor) => {
      const numFactor = Desintegration[factor as keyof typeof Desintegration];
      it(`Should handle desintegration factor ${numFactor}`, () => {
        jest.replaceProperty(mockPowderConfig, 'DESINTEGRATION', numFactor);

        render(<Cell type={VoidCell.VOID} display={true} />);
        const expectedHeightClass = `h-[calc(2rem/${numFactor})]`;
        const expectedWidthClass = `w-[calc(2rem/${numFactor})]`;
        expect(screen.getByTestId('board-cell')).toHaveClass(
          expectedHeightClass
        );
        expect(screen.getByTestId('board-cell')).toHaveClass(
          expectedWidthClass
        );
      });
    });

  it('Should throw error on unknown desintegration factor', () => {
    const unknownNumFactor = -1;
    jest.replaceProperty(
      mockPowderConfig,
      'DESINTEGRATION',
      unknownNumFactor as Desintegration
    );

    expect(() =>
      render(<Cell type={VoidCell.VOID} display={true} />)
    ).toThrow();
  });

  Object.values(BlockColor).forEach((color) => {
    it(`Should handle block color ${color}`, () => {
      render(<Cell type={color} display={true} />);

      expect(screen.getByTestId('board-cell-fill')).toHaveClass(
        `bg-powdromino-${color}`
      );
    });
  });

  it('Should handle void blocks', () => {
    const testType = VoidCell.VOID;
    render(<Cell type={testType} display={true} />);

    expect(screen.getByTestId('board-cell-fill')).toHaveClass('invisible');
  });

  it('Should handle display property being false', () => {
    const testType = VoidCell.VOID;
    render(<Cell type={testType} display={false} />);

    expect(screen.getByTestId('board-cell')).toHaveClass('invisible');
  });

  it('Should handle display property being true', () => {
    const testType = VoidCell.VOID;
    render(<Cell type={testType} display={true} />);

    expect(screen.getByTestId('board-cell')).not.toHaveClass('invisible');
  });
});
