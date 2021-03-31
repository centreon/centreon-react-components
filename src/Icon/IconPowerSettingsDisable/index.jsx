import React from 'react';

import { styled } from '@material-ui/core/styles';
import PowerSettings from '@material-ui/icons/PowerSettingsNew';

import MaterialIcon from '../MaterialIcon';
import RoundedInvertedIcon from '../RoundedInvertedIcon';

const RoundedInvertedPowerSettings = RoundedInvertedIcon(PowerSettings);

const DisablingMaterialIcon = styled(MaterialIcon)(() => ({
  '&::after': {
    background: '#7f7f7f',
    content: "''",
    height: 30,
    left: 9,
    position: 'absolute',
    top: -2,
    transform: 'rotate(140deg)',
    width: 2,
    zIndex: 1,
  },
  '&::before': {
    background: '#fff',
    content: "''",
    height: 30,
    left: 9,
    position: 'absolute',
    top: -3,
    transform: 'rotate(140deg)',
    width: 4,
    zIndex: 1,
  },
  display: 'inline-block',
  height: 23,
  position: 'relative',
  verticalAlign: 'middle',
  width: 23,
}));

const IconPowerSettings = (props) => (
  <DisablingMaterialIcon {...props} aria-label="icon enable disable inactive">
    <RoundedInvertedPowerSettings />
  </DisablingMaterialIcon>
);

export default IconPowerSettings;
