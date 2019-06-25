// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#e3f2fd',
    },
    '&:hover': {
      backgroundColor: '#cae6f1 !important',
    },
    cursor: 'pointer',
  },
};

export default withStyles(styles)(TableRow);
