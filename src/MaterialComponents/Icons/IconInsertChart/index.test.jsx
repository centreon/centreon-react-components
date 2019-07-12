/* eslint-disable no-undef */

import React from 'react';
import { create } from 'react-test-renderer';
import IconInsertChart from '.';

describe('IconInsertChart', () => {
  it('renders', () => {
    const wrapper = create(<IconInsertChart />);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
