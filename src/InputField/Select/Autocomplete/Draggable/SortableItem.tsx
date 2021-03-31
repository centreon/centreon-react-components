import * as React from 'react';

import clsx from 'clsx';
import { SortableElement } from 'react-sortable-hoc';

import { Chip, makeStyles, lighten } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  createdTag: {
    backgroundColor: lighten(theme.palette.primary.main, 0.7),
  },
  sorting: {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeOut,
    }),
  },
  tag: {
    margin: theme.spacing(0.5),
  },
}));

const SortableItem = SortableElement(
  ({ name, createOption, idx, deleteValue, isSorting }): JSX.Element => {
    const classes = useStyles();

    return (
      <Chip
        clickable
        className={clsx(
          classes.tag,
          createOption && classes.createdTag,
          isSorting && classes.sorting,
        )}
        deleteIcon={<CloseIcon />}
        label={name}
        size="small"
        onDelete={() => deleteValue(idx)}
      />
    );
  },
);

export default SortableItem;
