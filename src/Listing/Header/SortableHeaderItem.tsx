import * as React from 'react';

import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS, Transform } from '@dnd-kit/utilities';

import DragIndicatorIcon from '@material-ui/icons/MoreVert';
import { Box, makeStyles, TableSortLabel, Theme } from '@material-ui/core';

import { Column } from '../models';

import HeaderLabel from './Label';

interface StylesProps {
  isDragging: boolean;
  transition?: string;
  transform: Transform | null;
  isOver: boolean;
}

const useStyles = makeStyles<Theme, StylesProps>(() => ({
  box: {
    display: 'flex',
  },
  item: {
    opacity: ({ isDragging }) => (isDragging ? 0.5 : 1),
    // transform: ({ transform }) => CSS.Translate.toString(transform),
    transition: ({ transition }) => transition,
    transform: ({ isOver }) => (isOver ? 'translate(20px,0)' : 'unset'),

    display: 'flex',
    cursor: 'grab',
  },
}));

export interface Props {
  column: Column;
  onSort: (event, sortField: string) => void;
  order?: 'asc' | 'desc';
  orderBy?: string;
}

const SortableHeaderItem = ({
  column,
  onSort,
  order,
  orderBy,
}: Props): JSX.Element => {
  const { id } = column;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const { isOver, setNodeRef: otherRef } = useDroppable({ id });

  const classes = useStyles({
    transform,
    transition,
    isDragging,
    isOver,
  });

  const sortField = column.sortField || column.id;

  const onSortClick = (event): void => {
    onSort(event, sortField);
  };

  return (
    <div className={classes.item} ref={otherRef}>
      <div
        className={classes.box}
        ref={setNodeRef}
        {...listeners}
        {...attributes}
      >
        <DragIndicatorIcon fontSize="small" />
      </div>
      <div className={classes.box}>
        {column.sortable === false ? (
          <HeaderLabel>{column.label}</HeaderLabel>
        ) : (
          <TableSortLabel
            aria-label={`Column ${column.label}`}
            active={orderBy === sortField}
            direction={order || 'desc'}
            onClick={onSortClick}
          >
            <HeaderLabel>{column.label}</HeaderLabel>
          </TableSortLabel>
        )}
      </div>
    </div>
  );
};

export default SortableHeaderItem;
