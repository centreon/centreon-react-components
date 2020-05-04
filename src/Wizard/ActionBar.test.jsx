import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import ActionBar from './ActionBar';

describe('ActionBar', () => {
  it('cancels', () => {
    const mockCancel = jest.fn();

    const { getByText } = render(
      <ActionBar onCancel={mockCancel} labelCancel="Exit" />,
    );

    act(() => {
      fireEvent.click(getByText('Exit').parentNode);
    });

    expect(mockCancel).toBeCalled();
  });

  it('cannot finish if form is not valid', () => {
    const { getByText } = render(<ActionBar disabledNext />);

    expect(getByText('Finish').parentNode).toHaveAttribute('disabled');
  });
});
