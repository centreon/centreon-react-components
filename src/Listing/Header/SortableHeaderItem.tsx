import * as React from 'react';

import { useDroppable } from '@dnd-kit/core';
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
  isOver: boolean;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) => ({
  box: {
    display: 'flex',
  },
  item: ({ isDragging, isOver, transform, transition }) => {
    const isActive = isDragging || isOver;

    return {
      opacity: isDragging ? 0.5 : 1,
      transition: isActive ? transition : 'unset',
      zIndex: isDragging ? theme.zIndex.tooltip : 'unset',
      transform: isActive ? CSS.Translate.toString(transform) : 'unset',
      cursor: isDragging ? 'grabbing' : 'grab',
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
  } = useSortable({ id });

  const { isOver, setNodeRef: otherRef } = useDroppable({ id });

  const classes = useStyles({
    transition,
    isDragging,
    transform,
    isOver,
  });
  const cellClasses = useCellStyles({ listingCheckable: true });

  const columnSortField = column.sortField || column.id;

  const sort = (event): void => {
    const isDesc = columnSortField === sortField && sortOrder === 'desc';

    console.log(event, {
      sortOrder: isDesc ? 'asc' : 'desc',
      sortField: columnSortField,
    });

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
      onDragEnd={() => console.log('dragend')}
      {...listeners}
      {...attributes}
    >
      <div style={{ display: 'flex' }} ref={otherRef}>
        {columnConfiguration?.sortable && (
          <div className={classes.box}>
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
      </div>
    </HeaderCell>
  );
};

export default SortableHeaderItem;
