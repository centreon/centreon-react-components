import React from 'react';
import PropTypes from 'prop-types';
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#10069F',
    },
    background: {
      default: '#EDEDED',
    },
    warning: {
      main: '#FF9A13',
    },
    success: {
      main: '#84BD00',
    },
    error: {
      main: '#f90026',
    },
    info: {
      main: '#00d3d4',
    },
    action: {
      acknowledged: '#AA9C24',
      acknowledgedBackground: '#F7F4E5',
      inDowntime: '#9C27B0',
      inDowntimeBackground: '#F9E7FF',
    },
  },
});

const ThemeProvider = ({ children, ...rest }) => (
  <MuiThemeProvider theme={theme} {...rest}>
    {children}
  </MuiThemeProvider>
);

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

ThemeProvider.defaultProps = {};

export default ThemeProvider;
