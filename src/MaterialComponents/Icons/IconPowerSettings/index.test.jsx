/* eslint-disable no-undef */

import React from 'react';
import { create } from 'react-test-renderer';
import IconPowerSettings from '.';

describe('IconPowerSettings', () => {
  it('renders', () => {
    const wrapper = create(<IconPowerSettings />);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
