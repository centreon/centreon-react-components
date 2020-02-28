import React from 'react';

import {
  Snackbar,
  SnackbarContent,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { Error, CheckCircle, Warning, Info, Close } from '@material-ui/icons';

import Severity from './Severity';

const useStyles = makeStyles((theme) => ({
  error: {
    backgroundColor: theme.palette.error.dark,
    marginRight: theme.spacing(1),
  },
  success: {
    backgroundColor: theme.palette.success.dark,
    marginRight: theme.spacing(1),
  },
  warning: {
    backgroundColor: theme.palette.warning.dark,
    marginRight: theme.spacing(1),
  },
  info: {
    backgroundColor: theme.palette.info.dark,
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
  severity?: Severity;
}

const ErrorSnackbar = ({
  message = '',
  open,
  onClose = undefined,
  severity = Severity.success,
}: Props): JSX.Element => {
  const classes = useStyles();

  const classNames = `${classes.icon} ${classes[severity]}`;

  const Message = (
    <span className={classes.message}>
      {severity === Severity.error && <Error className={classNames} />}
      {severity === Severity.warning && <Warning className={classNames} />}
      {severity === Severity.success && <CheckCircle className={classNames} />}
      {severity === Severity.info && <Info className={classNames} />}
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
        className={classes[severity]}
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
