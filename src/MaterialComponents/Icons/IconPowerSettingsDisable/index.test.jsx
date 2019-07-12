/* eslint-disable no-undef */

import React from 'react';
import { create } from 'react-test-renderer';
import IconPowerSettingsDisable from '.';

describe('IconPowerSettingsDisable', () => {
  it('renders', () => {
    const wrapper = create(<IconPowerSettingsDisable />);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
