/* eslint-disable no-undef */

import React from 'react';
import { create } from 'react-test-renderer';
import IconEdit from '.';

describe('IconEdit', () => {
  it('renders', () => {
    const wrapper = create(<IconEdit />);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
