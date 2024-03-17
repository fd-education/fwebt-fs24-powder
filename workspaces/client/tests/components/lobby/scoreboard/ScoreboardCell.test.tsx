import { ScoreboardCell } from '@/src/components/lobby/scoreboard/ScoreboardCell';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('ScoreboardCell component: interface', () => {
  it('Should accept and render cell text', () => {
    const testCell = 'Test Cell';
    render(<ScoreboardCell text={testCell} />);
    expect(screen.getByText(testCell)).toBeInTheDocument();
  });
});
