/* eslint-disable react/prop-types */

import React, { Ref } from 'react';

import clsx from 'clsx';

import { Box, Chip, Grid, Typography, makeStyles } from '@material-ui/core';
import { Create } from '@material-ui/icons';

import useHover from './useHover';

const maxChips = 5;

const useStyles = makeStyles((theme) => ({
  hidden: {
    visibility: 'hidden',
  },
  container: {
    borderRadius: theme.spacing(1) * 0.5,
    padding: theme.spacing(1),
    cursor: 'pointer',
    outline: 'none',
  },
  hovered: {
    backgroundColor: theme.palette.grey[400],
  },
  chip: {
    width: '95%',
    marginTop: theme.spacing(1),
  },
  emptyChip: {
    padding: theme.spacing(1),
    borderWidth: 2,
    borderColor: theme.palette.grey[600],
    borderStyle: 'dashed',
  },
}));

const Entry = ({ label }): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid item xs={6}>
      <Chip className={classes.chip} disabled label={label} size="small" />
    </Grid>
  );
};

const EmptyEntry = ({ label }): JSX.Element => {
  const classes = useStyles();

  return <div className={classes.emptyChip}>{label}</div>;
};

const MultiSelectEntries = ({
  label,
  highlight,
  emptyLabel,
  onClick,
  values = [],
}): JSX.Element => {
  const classes = useStyles();

  const [hoverRef, isHovered] = useHover();

  const count = values.length;

  const caption = `${label} (${count})`;

  return (
    <div
      ref={hoverRef as Ref<HTMLDivElement>}
      className={clsx({
        [classes.hovered]: isHovered || highlight,
        [classes.container]: true,
      })}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
    >
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="caption">{caption}</Typography>
        </Box>
        <Box>
          <Create
            fontSize="small"
            className={clsx({ [classes.hidden]: !isHovered && !highlight })}
          />
        </Box>
      </Box>
      <Grid container justify="flex-start">
        {values.slice(1, maxChips + 1).map(({ name }) => (
          <Entry label={name} />
        ))}
        {count > maxChips && <Entry label="..." />}
      </Grid>
      {count === 0 && <EmptyEntry label={emptyLabel} />}
    </div>
  );
};

export default MultiSelectEntries;
