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
  input: {
    fontSize: theme.typography.body1.fontSize,
  },
  noLabelInput: {
    padding: theme.spacing(1.25),
  },
  compact: {
    padding: theme.spacing(0.75),
    fontSize: 'x-small',
  },
  small: {
    padding: theme.spacing(0.75),
    fontSize: 'small',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
}));

interface OptionalLabelInputAdornmentProps {
  label?: React.ReactNode;
  position: 'end' | 'start';
  children: React.ReactNode;
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
  StartAdornment?: React.SFC;
  EndAdornment?: React.SFC;
  error?: string;
  compact?: boolean;
  small?: boolean;
  ariaLabel?: string;
  transparent?: boolean;
} & Omit<TextFieldProps, 'variant' | 'size' | 'error'>;

const TextField = React.forwardRef(
  (
    {
      StartAdornment,
      EndAdornment,
      label,
      error,
      ariaLabel,
      transparent = false,
      compact = false,
      small = false,
      ...rest
    }: Props,
    ref: React.ForwardedRef<HTMLDivElement>,
  ): JSX.Element => {
    const classes = useStyles();

    return (
      <MuiTextField
        ref={ref}
        label={label}
        error={!isNil(error)}
        helperText={error}
        InputProps={{
          className: clsx({
            [classes.transparent]: transparent,
          }),
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
          disableUnderline: true,
        }}
        inputProps={{
          'aria-label': ariaLabel,
          className: clsx(classes.input, {
            [classes.noLabelInput]: !label && !compact,
            [classes.small]: small,
            [classes.compact]: compact,
          }),
        }}
        variant="filled"
        size="small"
        {...rest}
      />
    );
  },
);

export default TextField;
