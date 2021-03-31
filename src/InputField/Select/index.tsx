import * as React from 'react';

import clsx from 'clsx';
import { isNil, propEq } from 'ramda';

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  makeStyles,
  Theme,
  SelectProps,
  FormHelperText,
  ListSubheader,
  Divider,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  compact: {
    fontSize: 'x-small',
    padding: theme.spacing(0.5),
  },
  noLabelInput: {
    padding: theme.spacing(1.5),
  },
}));

export interface SelectEntry {
  color?: string;
  id: number | string;
  name: string;
  type?: 'header';
  url?: string;
}

type Props = {
  ariaLabel?: string;
  compact?: boolean;
  error?: string;
  label?: string;
  onChange;
  options: Array<SelectEntry>;
  selectedOptionId: number | string;
} & Omit<SelectProps, 'error'>;

const SelectField = ({
  options,
  onChange,
  selectedOptionId,
  label,
  error,
  fullWidth,
  ariaLabel,
  inputProps,
  compact = false,
  ...props
}: Props): JSX.Element => {
  const classes = useStyles();

  const getOption = (id): SelectEntry => {
    return options.find(propEq('id', id)) as SelectEntry;
  };

  const changeOption = (event) => {
    if (!isNil(event.target.value)) {
      onChange(event);
    }
  };

  return (
    <FormControl
      error={!isNil(error)}
      fullWidth={fullWidth}
      size="small"
      variant="filled"
    >
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        disableUnderline
        displayEmpty
        fullWidth={fullWidth}
        inputProps={{
          'aria-label': ariaLabel,
          className: clsx({
            [classes.noLabelInput]: !label && !compact,
            [classes.compact]: compact,
          }),
          ...inputProps,
        }}
        renderValue={(id) => {
          return getOption(id)?.name;
        }}
        value={selectedOptionId}
        onChange={changeOption}
        {...props}
      >
        {options
          .filter(({ id }) => id !== '')
          .map(({ id, name, color, type }) => {
            const key = `${id}-${name}`;
            if (type === 'header') {
              return [
                <ListSubheader key={key}>{name}</ListSubheader>,
                <Divider key={`${key}-divider`} />,
              ];
            }

            return (
              <MenuItem key={key} style={{ backgroundColor: color }} value={id}>
                {name}
              </MenuItem>
            );
          })}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default SelectField;
