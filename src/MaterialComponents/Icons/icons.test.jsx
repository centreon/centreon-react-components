/* eslint-disable no-undef */

import React from 'react';
import { render } from '@testing-library/react';
import IconAttach from './IconAttach';
import IconClose from './IconClose';
import IconEdit from './IconEdit';
import IconDelete from './IconDelete';
import IconInsertChart from './IconInsertChart';
import IconLibraryAdd from './IconLibraryAdd';
import IconPowerSettings from './IconPowerSettings';
import IconPowerSettingsDisable from './IconPowerSettingsDisable';

[
  IconAttach,
  IconClose,
  IconEdit,
  IconDelete,
  IconInsertChart,
  IconLibraryAdd,
  IconPowerSettings,
  IconPowerSettingsDisable,
].forEach((IconComponent) => {
  const componentName = Symbol(IconComponent).toString();
  describe(componentName, () => {
    it('renders', () => {
      const { asFragment } = render(<IconComponent />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
