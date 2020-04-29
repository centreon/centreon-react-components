import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ActionBar from './ActionBar';

const mockFn = jest.fn();

describe('ActionBar', () => {
  it('cancels', () => {
    const mockCancel = jest.fn();

    const { getByText } = render(
      <ActionBar onCancel={mockCancel} labelCancel="Exit" />,
    );

    fireEvent.click(getByText('Exit').parentNode);

    expect(mockCancel).toBeCalled();
  });

  it('cannot finish if form is not valid', () => {
    const { getByText } = render(<ActionBar disabledNext />);

    expect(getByText('Finish').parentNode).toHaveAttribute('disabled');
  });

  it('displays custom previous, next button label when wizar is on second step and not on last step', () => {
    const { getByText } = render(
      <ActionBar
        isLastPage={false}
        page={1}
        labelPrevious="Custom previous"
        labelNext="Custom next"
      />,
    );

    expect(getByText('Custom previous')).toBeInTheDocument();
    expect(getByText('Custom next')).toBeInTheDocument();
  });

  it('displays custom previous, finish button label when wizard is on last step', () => {
    const { getByText } = render(
      <ActionBar
        isLastPage
        page={1}
        labelPrevious="Custom previous"
        labelFinish="Custom finish"
      />,
    );

    expect(getByText('Custom previous')).toBeInTheDocument();
    expect(getByText('Custom finish')).toBeInTheDocument();
  });

  it('displays custom cancel button label when wizard can be canceled', () => {
    const { getByText } = render(
      <ActionBar onCancel={mockFn} labelCancel="Custom cancel" />,
    );

    expect(getByText('Custom cancel')).toBeInTheDocument();
  });
});
