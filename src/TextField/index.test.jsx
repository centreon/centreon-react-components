import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TextField from '.';

describe('TextField', () => {
  it('renders correctly', () => {
    const { container } = render(
      <TextField
        label="label"
        helperText="helper text"
        placeholder="placeholder"
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('triggers change', async () => {
    const mockOnChange = jest.fn();

    const { getByPlaceholderText } = render(
      <TextField onChange={mockOnChange} placeholder="placeholder" />,
    );

    const input = getByPlaceholderText('placeholder');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(mockOnChange).toBeCalled();
  });
});
