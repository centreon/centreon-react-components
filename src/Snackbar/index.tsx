import React from 'react';

import {
  Snackbar,
  SnackbarContent,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { Error, CheckCircle, Close } from '@material-ui/icons';

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  error: {
    backgroundColor: theme.palette.error.dark,
    marginRight: theme.spacing(1),
  },
  success: {
    backgroundColor: theme.palette.success.dark,
    marginRight: theme.spacing(1),
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

interface Props {
  message?: string;
  open: boolean;
  onClose?: () => void;
  isError?: boolean;
}

const ErrorSnackbar = ({
  message = '',
  open,
  onClose = undefined,
  isError = false,
}: Props): JSX.Element => {
  const classes = useStyles();

  const classNames = `${classes.icon} ${
    isError ? classes.error : classes.success
  }`;

  const Message = (
    <span className={classes.message}>
      {isError ? (
        <Error className={classNames} />
      ) : (
        <CheckCircle className={classNames} />
      )}
      {message}
    </span>
  );

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <SnackbarContent
        className={isError ? classes.error : classes.success}
        message={Message}
        action={[
          <IconButton key="close" color="inherit" onClick={onClose}>
            <Close className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

export default ErrorSnackbar;
