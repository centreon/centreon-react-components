import React from 'react';

import clsx from 'clsx';
import { isNil } from 'ramda';

import {
  TextField as MuiTextField,
  InputAdornment,
  TextFieldProps,
  Theme,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  compact: {
    fontSize: 'x-small',
    padding: theme.spacing(1),
  },
  noLabelInput: {
    padding: theme.spacing(1.5),
  },
  transparent: {
    backgroundColor: 'transparent',
  },
}));

interface OptionalLabelInputAdornmentProps {
  children: React.ReactNode;
  label?: React.ReactNode;
  position: 'end' | 'start';
}

const OptionalLabelInputAdornment = ({
  label,
  position,
  children,
}: OptionalLabelInputAdornmentProps): JSX.Element => {
  const noMarginWhenNoLabel = !label && { style: { marginTop: 0 } };

  return (
    <InputAdornment {...noMarginWhenNoLabel} position={position}>
      {children}
    </InputAdornment>
  );
};

export type Props = {
  EndAdornment?: React.SFC;
  StartAdornment?: React.SFC;
  ariaLabel?: string;
  compact?: boolean;
  error?: string;
  transparent?: boolean;
} & Omit<TextFieldProps, 'variant' | 'size' | 'error'>;

const TextField = ({
  StartAdornment,
  EndAdornment,
  label,
  error,
  ariaLabel,
  transparent = false,
  compact = false,
  ...rest
}: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <MuiTextField
      InputProps={{
        className: clsx({
          [classes.transparent]: transparent,
        }),
        disableUnderline: true,
        endAdornment: EndAdornment && (
          <OptionalLabelInputAdornment label={label} position="end">
            <EndAdornment />
          </OptionalLabelInputAdornment>
        ),
        startAdornment: StartAdornment && (
          <OptionalLabelInputAdornment label={label} position="start">
            <StartAdornment />
          </OptionalLabelInputAdornment>
        ),
      }}
      error={!isNil(error)}
      helperText={error}
      inputProps={{
        'aria-label': ariaLabel,
        className: clsx({
          [classes.noLabelInput]: !label && !compact,
          [classes.compact]: compact,
        }),
      }}
      label={label}
      size="small"
      variant="filled"
      {...rest}
    />
  );
};

export default TextField;
