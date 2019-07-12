/* eslint-disable no-undef */

import React from 'react';
import { create } from 'react-test-renderer';
import IconLibraryAdd from '.';

describe('IconLibraryAdd', () => {
  it('renders', () => {
    const wrapper = create(<IconLibraryAdd />);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
