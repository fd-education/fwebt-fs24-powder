import { Panel } from '@/src/components/util/Panel';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Panel component: interface', () => {
  it('Should accept and render children', () => {
    const testId = 'test-id';
    render(
      <Panel>
        <div data-testid={testId}></div>
      </Panel>
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
