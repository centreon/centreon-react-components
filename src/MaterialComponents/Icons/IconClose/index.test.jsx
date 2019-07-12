/* eslint-disable no-undef */

import React from 'react';
import { create } from 'react-test-renderer';
import IconClose from '.';

describe('IconClose', () => {
  it('renders', () => {
    const wrapper = create(<IconClose />);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
