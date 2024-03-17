import React from 'react';
import { PowderButton } from '@/src/components/util/PowderButton';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('PowderButton component: interface & behaviour', () => {
  it('Should take text, action and style props', async () => {
    const stubAction = jest.fn();
    const buttonText = 'Test PowderButton';

    render(
      <PowderButton
        text={buttonText}
        clickHandler={stubAction}
        style='text-white'
      />
    );

    const button = await screen.findByText(buttonText);
    await userEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('text-white');
    expect(stubAction).toHaveBeenCalledTimes(1);
  });
});
