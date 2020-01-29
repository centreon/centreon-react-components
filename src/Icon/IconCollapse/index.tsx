import React from 'react';

import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

import MaterialIcon from '../MaterialIcon';

interface Props {
  toggled: boolean;
}

const IconArrowUpDown = ({ toggled = false, ...props }: Props): JSX.Element => (
    <MaterialIcon {...props}>
      {toggled ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
    </MaterialIcon>
  );

export default IconArrowUpDown;
