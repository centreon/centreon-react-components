/* eslint-disable no-undef */

import React from 'react';
import { shallow } from 'enzyme';

import MaterialIcon from '.';

describe('MaterialIcon', () => {
  it('renders', () => {
    const wrapper = shallow(
      <MaterialIcon>
        <i />
      </MaterialIcon>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
