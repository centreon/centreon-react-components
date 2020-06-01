import React from 'react';

import clsx from 'clsx';

import {
  TextField as MuiTextField,
  InputAdornment,
  TextFieldProps,
  Theme,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  noLabelInput: {
    padding: theme.spacing(1.5),
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
} & Omit<TextFieldProps, 'variant' | 'size'>;

const TextField = ({
  StartAdornment,
  EndAdornment,
  label,
  ...rest
}: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <MuiTextField
      label={label}
      InputProps={{
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
        className: clsx({ [classes.noLabelInput]: !label }),
      }}
      variant="filled"
      size="small"
      {...rest}
    />
  );
};

export default TextField;
