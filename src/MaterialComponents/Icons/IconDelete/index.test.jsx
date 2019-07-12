/* eslint-disable no-undef */

import React from 'react';
import { create } from 'react-test-renderer';
import IconDelete from '.';

describe('IconDelete', () => {
  it('renders', () => {
    const wrapper = create(<IconDelete />);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
