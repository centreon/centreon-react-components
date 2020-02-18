import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

interface SelectEntry {
  id: number;
  name: string;
}

interface Props {
  options: Array<SelectEntry>;
  onChange;
  selectedOptionId: number;
  label: string;
}

const SelectField = ({
  options,
  onChange,
  selectedOptionId,
  label,
}: Props): JSX.Element => {
  return (
    <FormControl variant="filled">
      <InputLabel>{label}</InputLabel>
      <Select value={selectedOptionId} onChange={onChange} disableUnderline>
        {options.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;
