import React from 'react';

import TablePagination from '@material-ui/core/TablePagination';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    boxShadow:
      '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
  },
  toolbar: {
    height: '32px',
    minHeight: 'auto',
    paddingLeft: 5,
    overflow: 'hidden',
  },
};

const Pagination = (props): JSX.Element => (
  <TablePagination component="div" {...props} />
);

export default withStyles(styles)(Pagination);
