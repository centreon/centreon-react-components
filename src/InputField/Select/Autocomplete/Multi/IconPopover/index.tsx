import * as React from 'react';

import { ClickAwayListener, Paper, Popper, useTheme } from '@material-ui/core';

import IconButton from '../../../../../Button/Icon';
import MultiAutocompleteField, {
  Props as MultiAutocompleteFieldProps,
} from '..';

type Props = MultiAutocompleteFieldProps & {
  icon: JSX.Element;
  title: string;
};

const IconPopoverMultiAutocomplete = ({
  icon,
  options,
  label,
  title,
  onChange,
  value,
  ...props
}: Props): JSX.Element => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState();

  const isOpen = Boolean(anchorEl);

  const close = (reason?): void => {
    const isClosedByInputClick = reason?.type === 'mousedown';

    if (isClosedByInputClick) {
      return;
    }
    setAnchorEl(undefined);
  };

  const toggle = (event): void => {
    if (isOpen) {
      close();
      return;
    }

    setAnchorEl(event.currentTarget);
  };

  return (
    <ClickAwayListener onClickAway={close}>
      <div>
        <IconButton title={title} ariaLabel={title} onClick={toggle}>
          {icon}
        </IconButton>
        <Popper
          style={{ zIndex: theme.zIndex.tooltip }}
          open={isOpen}
          anchorEl={anchorEl}
          placement="bottom-start"
        >
          <Paper>
            <MultiAutocompleteField
              onClose={close}
              label={label}
              options={options}
              onChange={onChange}
              value={value}
              open={isOpen}
              limitTags={1}
              {...props}
            />
          </Paper>
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default IconPopoverMultiAutocomplete;
