/* eslint-disable no-undef */

import React from 'react';
import { create } from 'react-test-renderer';
import IconAttach from '.';

describe('IconAttach', () => {
  it('renders', () => {
    const wrapper = create(<IconAttach />);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
