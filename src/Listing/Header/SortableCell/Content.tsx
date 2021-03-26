import * as React from 'react';

import { makeStyles, TableSortLabel, Theme } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import { Props as ListingProps } from '../..';
import { Column } from '../../models';
import HeaderLabel from '../Label';

const useStyles = makeStyles<Theme, Pick<Props, 'isDragging'>>(() => ({
  dragHandle: ({ isDragging }) => ({
    display: 'flex',
    cursor: isDragging ? 'grabbing' : 'grab',
    outline: 'none',
  }),
}));

type Props = Pick<
  ListingProps<unknown>,
  'columnConfiguration' | 'sortField' | 'sortOrder' | 'onSort'
> & {
  column: Column;
  isDragging?: boolean;
};

const SortableHeaderCellContent = React.forwardRef(
  (
    {
      column,
      columnConfiguration,
      sortField,
      sortOrder,
      onSort,
      isDragging,
      ...props
    }: Props,
    ref: React.ForwardedRef<HTMLDivElement>,
  ): JSX.Element => {
    const classes = useStyles({ isDragging });

    const columnSortField = column.sortField || column.id;

    const sort = (): void => {
      const isDesc = columnSortField === sortField && sortOrder === 'desc';

      onSort?.({
        sortOrder: isDesc ? 'asc' : 'desc',
        sortField: columnSortField,
      });
    };

    return (
      <div style={{ display: 'flex', alignItems: 'center' }} ref={ref}>
        {columnConfiguration?.sortable && (
          <div className={classes.dragHandle} {...props}>
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
    );
  },
);

export default SortableHeaderCellContent;
