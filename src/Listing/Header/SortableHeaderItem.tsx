import * as React from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS, Transform } from '@dnd-kit/utilities';
import clsx from 'clsx';

import DragIndicatorIcon from '@material-ui/icons/MoreVert';
import { makeStyles, TableSortLabel, Theme } from '@material-ui/core';

import { Column } from '../models';
import { useStyles as useCellStyles } from '../Cell/DataCell';
import { ListingProps } from '../..';

import HeaderLabel from './Label';

import { HeaderCell } from '.';

interface StylesProps {
  isDragging: boolean;
  transition?: string;
  transform: Transform | null;
  isSorting: boolean;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) => ({
  dragHandle: ({ isDragging }) => ({
    display: 'flex',
    cursor: isDragging ? 'grabbing' : 'grab',
  }),
  item: ({ isDragging, transform, transition, isSorting }) => {
    return {
      opacity: isDragging ? 0.5 : 1,
      transition: isSorting ? transition : undefined,
      zIndex: isDragging ? theme.zIndex.tooltip : undefined,
      transform: isSorting ? CSS.Translate.toString(transform) : undefined,
    };
  },
}));

type Props = Pick<
  ListingProps<unknown>,
  'onSort' | 'sortOrder' | 'sortField' | 'columnConfiguration'
> & { column: Column };

const SortableHeaderItem = ({
  column,
  columnConfiguration,
  onSort,
  sortOrder,
  sortField,
}: Props): JSX.Element => {
  const { id } = column;

  const {
    attributes,
    listeners,
    setNodeRef: sortableRef,
    transition,
    transform,
    isDragging,
    isSorting,
  } = useSortable({ id });

  const classes = useStyles({
    transition,
    isDragging,
    transform,
    isSorting,
  });
  const cellClasses = useCellStyles({ listingCheckable: true });

  const columnSortField = column.sortField || column.id;

  const sort = (): void => {
    const isDesc = columnSortField === sortField && sortOrder === 'desc';

    onSort?.({
      sortOrder: isDesc ? 'asc' : 'desc',
      sortField: columnSortField,
    });
  };

  return (
    <HeaderCell
      key={column.id}
      padding={column.compact ? 'none' : 'default'}
      sortDirection={sortField === column.id ? sortOrder : false}
      component="div"
      className={clsx([cellClasses.cell, classes.item])}
      ref={sortableRef}
    >
      {columnConfiguration?.sortable && (
        <div className={classes.dragHandle} {...listeners} {...attributes}>
          <DragIndicatorIcon fontSize="small" />
        </div>
      )}
      {column.sortable === false ? (
        <HeaderLabel>{column.label}</HeaderLabel>
      ) : (
        <TableSortLabel
          aria-label={`Column ${column.label}`}
          active={sortField === columnSortField}
          direction={sortOrder || 'desc'}
          onClick={sort}
        >
          <HeaderLabel>{column.label}</HeaderLabel>
        </TableSortLabel>
      )}
    </HeaderCell>
  );
};

export default SortableHeaderItem;
