import * as React from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS, Transform } from '@dnd-kit/utilities';
import clsx from 'clsx';

import { makeStyles, Theme } from '@material-ui/core';

import { Column } from '../../models';
import { useStyles as useCellStyles } from '../../Cell/DataCell';
import { ListingProps } from '../../..';
import { HeaderCell } from '..';

import SortableHeaderCellContent from './Content';

interface StylesProps {
  isDragging: boolean;
  transition?: string;
  transform: Transform | null;
}

const useStyles = makeStyles<Theme, StylesProps>(() => ({
  item: ({ isDragging, transform, transition }: StylesProps) => ({
    opacity: isDragging ? 0.5 : 1,
    transition: isDragging ? transition : undefined,
    transform: isDragging ? CSS.Translate.toString(transform) : undefined,
    display: 'flex',
  }),
}));

type Props = Pick<
  ListingProps<unknown>,
  'onSort' | 'sortOrder' | 'sortField' | 'columnConfiguration'
> & { column: Column };

const SortableHeaderCell = ({
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

  const classes = useStyles({
    transition: transition || undefined,
    isDragging,
    transform,
  });
  const cellClasses = useCellStyles({ listingCheckable: true });

  return (
    <HeaderCell
      key={column.id}
      padding={column.compact ? 'none' : 'default'}
      sortDirection={sortField === column.id ? sortOrder : false}
      component="div"
      className={clsx([cellClasses.cell, classes.item])}
    >
      <SortableHeaderCellContent
        columnConfiguration={columnConfiguration}
        column={column}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={onSort}
        ref={sortableRef}
        {...attributes}
        {...listeners}
      />
    </HeaderCell>
  );
};

export default SortableHeaderCell;
