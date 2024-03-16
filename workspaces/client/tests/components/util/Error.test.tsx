import { Error } from '@/src/components/util/Error';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Error Component: interface & behaviour', () => {
  it('Should render correct text', () => {
    const errorText = 'Some test error.';
    render(<Error text={errorText} />);

    expect(screen.getByText(errorText)).toBeInTheDocument();
  });
});
