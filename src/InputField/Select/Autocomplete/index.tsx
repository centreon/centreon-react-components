import React from 'react';

import { Checkbox, makeStyles, CircularProgress } from '@material-ui/core';
import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';

import TextField from '../../Text';
import { SelectEntry } from '..';

const useStyles = makeStyles(() => ({
  input: {
    '&:before': {
      borderBottom: 0,
    },
    '&:after': {
      borderBottom: 0,
    },
    '&:hover:before': {
      borderBottom: 0,
    },
  },
}));

interface Props {
  options: Array<SelectEntry>;
  label: string;
  placeholder?: string;
  loading?: boolean;
  onChange;
}

const AutocompleteField = ({
  options,
  label,
  placeholder = '',
  loading = false,
  ...props
}: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Autocomplete
      multiple
      size="small"
      options={options}
      disableCloseOnSelect
      loading={loading}
      classes={{ inputRoot: classes.input }}
      getOptionLabel={(option): string => option.name}
      loadingText={<CircularProgress size={20} />}
      renderOption={(option, { selected }): JSX.Element => (
        <>
          <Checkbox color="primary" checked={selected} />
          {option.name}
        </>
      )}
      renderInput={(params): JSX.Element => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
      {...props}
    />
  );
};

export default AutocompleteField;
