import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ActionBar from './ActionBar';

describe('ActionBar', () => {
  it('cancels', () => {
    const mockCancel = jest.fn();

    const { getByText } = render(
      <ActionBar onCancel={mockCancel} labelCancel="Exit" />,
    );

    fireEvent.click(getByText('Exit').parentNode);

    expect(mockCancel).toBeCalled();
  });

  it('cannot finish or go to previous step if form is not valid', () => {
    const { getByText } = render(<ActionBar disabledActionBar page={1} />);

    expect(getByText('Finish').parentNode).toHaveAttribute('disabled');

    expect(getByText('Previous').parentNode).toHaveAttribute('disabled');
  });
});
