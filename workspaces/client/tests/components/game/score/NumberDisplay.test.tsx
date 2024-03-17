import { NumberDisplay } from '@/src/components/game/score/NumberDisplay';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('NumberDisplay component: interface', () => {
  it('Should accept and display numebr', () => {
    const testNumber = 999;
    render(<NumberDisplay number={999} />);

    expect(screen.getByText(testNumber.toString())).toBeInTheDocument();
  });
});
