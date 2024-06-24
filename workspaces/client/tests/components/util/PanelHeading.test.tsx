import { PanelHeading } from '@/src/components/util/PanelHeading';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('PanelHeading component: interface', () => {
  it('Should render text', () => {
    const testText = 'Test Heading';
    render(<PanelHeading text={testText} />);

    expect(screen.getByText(testText)).toBeInTheDocument();
  });
});
