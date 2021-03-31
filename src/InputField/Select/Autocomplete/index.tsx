import * as React from 'react';

import { equals } from 'ramda';

import {
  makeStyles,
  CircularProgress,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import {
  Autocomplete,
  AutocompleteProps,
  UseAutocompleteProps,
} from '@material-ui/lab';

import TextField from '../../Text';
import { SelectEntry } from '..';

const useStyles = makeStyles((theme) => ({
  input: {
    '&:after': {
      borderBottom: 0,
    },
    '&:before': {
      borderBottom: 0,
    },
    '&:hover:before': {
      borderBottom: 0,
    },
  },
  inputEndAdornment: {
    paddingBottom: '19px',
  },
  loadingIndicator: {
    textAlign: 'center',
  },
  options: {
    alignItems: 'center',
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: theme.spacing(1),
  },
}));

const LoadingIndicator = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.loadingIndicator}>
      <CircularProgress size={20} />
    </div>
  );
};

type Multiple = boolean;
type DisableClearable = boolean;
type FreeSolo = boolean;

export type Props = {
  displayOptionThumbnail?: boolean;
  endAdornment?: React.ReactElement;
  label: string;
  labelError?: string;
  loading?: boolean;
  onTextChange?;
  placeholder?: string;
  required?: boolean;
} & Omit<
  AutocompleteProps<SelectEntry, Multiple, DisableClearable, FreeSolo>,
  'renderInput'
> &
  UseAutocompleteProps<SelectEntry, Multiple, DisableClearable, FreeSolo>;

const AutocompleteField = ({
  options,
  label,
  placeholder = '',
  loading = false,
  onTextChange = (): void => undefined,
  endAdornment = undefined,
  inputValue,
  displayOptionThumbnail = false,
  required = false,
  labelError,
  ...props
}: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Autocomplete
      classes={{ inputRoot: classes.input }}
      getOptionLabel={(option: SelectEntry): string => option.name}
      getOptionSelected={equals}
      loading={loading}
      loadingText={<LoadingIndicator />}
      options={options}
      renderInput={(params): JSX.Element => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {endAdornment && (
                  <InputAdornment
                    classes={{ root: classes.inputEndAdornment }}
                    position="end"
                  >
                    {endAdornment}
                  </InputAdornment>
                )}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          error={labelError}
          helperText={labelError}
          inputProps={{
            ...params.inputProps,
            'aria-label': label,
          }}
          label={label}
          placeholder={placeholder}
          required={required}
          value={inputValue || ''}
          onChange={onTextChange}
        />
      )}
      renderOption={(option) => {
        return (
          <div className={classes.options}>
            {displayOptionThumbnail && (
              <img alt={option.name} height={20} src={option.url} width={20} />
            )}

            <Typography>{option.name}</Typography>
          </div>
        );
      }}
      size="small"
      {...props}
    />
  );
};

export default AutocompleteField;
