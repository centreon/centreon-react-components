import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ActionBar from './ActionBar';

describe('ActionBar', () => {
  it('renders correctly', () => {
    const { container } = render(
      <ActionBar bag={{ isSubmitting: false, isValid: true }} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('cancels', () => {
    const mockCancel = jest.fn();

    const { getByText } = render(
      <ActionBar
        bag={{ isSubmitting: false, isValid: true }}
        onCancel={mockCancel}
        labelCancel="Exit"
      />,
    );

    fireEvent.click(getByText('Exit').parentNode);

    expect(mockCancel).toBeCalled();
  });

  it('cannot finish if form is not valid', () => {
    const { getByText } = render(
      <ActionBar bag={{ isSubmitting: false, isValid: false }} />,
    );

    expect(getByText('Finish').parentNode).toHaveAttribute('disabled');
  });
});
