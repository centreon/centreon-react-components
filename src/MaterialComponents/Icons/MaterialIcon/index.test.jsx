/* eslint-disable no-undef */

import React from 'react';
import { render } from '@testing-library/react';
import MaterialIcon from '.';

describe('MaterialIcon', () => {
  it('renders', () => {
    const { container } = render(
      <MaterialIcon>
        <i />
      </MaterialIcon>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
