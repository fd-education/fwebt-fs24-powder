import { Title, TitleSize } from '@/src/components/util/Title';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Title component: interface', () => {
  it('Should handle big title', () => {
    render(<Title size={TitleSize.BIG} />);

    const title = screen.getByText('POWDER');
    const subtitle = screen.getByText('TETRIS, BUT COOLER ...');

    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-[10rem]');
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveClass('text-3xl');
  });

  it('Should handle small title', () => {
    render(<Title size={TitleSize.SMALL} />);

    const title = screen.getByText('POWDER');
    const subtitle = screen.getByText('TETRIS, BUT COOLER ...');

    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-7xl');
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveClass('text-2xl');
  });
});
