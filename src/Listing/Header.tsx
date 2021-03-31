import * as React from 'react';

import {
  Checkbox,
  TableHead,
  TableRow,
  TableCell,
  withStyles,
  TableSortLabel,
  Typography,
} from '@material-ui/core';

import { useStyles as useCellStyles } from './ColumnCell';

const HeaderCell = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
}))(TableCell);

const HeaderTypography = withStyles({
  root: {
    fontWeight: 'bold',
  },
})(Typography);

interface Props {
  checkable: boolean;
  headColumns;
  numSelected: number;
  onRequestSort: (event, property) => void;
  onSelectAllClick: (event) => void;
  order?: 'desc' | 'asc';
  orderBy?: string;
  rowCount: number;
}

const ListingHeader = React.forwardRef(
  (
    {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      headColumns,
      checkable,
      onRequestSort,
    }: Props,
    ref,
  ): JSX.Element => {
    const classes = useCellStyles(checkable);

    const createSortHandler = (property) => (event): void => {
      onRequestSort(event, property);
    };

    const getSortField = (column): string => column.sortField || column.id;

    return (
      <TableHead ref={ref as React.RefObject<HTMLTableSectionElement>}>
        <TableRow>
          {checkable ? (
            <HeaderCell padding="checkbox">
              <Checkbox
                checked={numSelected === rowCount}
                color="primary"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                inputProps={{ 'aria-label': 'Select all' }}
                size="small"
                onChange={onSelectAllClick}
              />
            </HeaderCell>
          ) : null}

          {headColumns.map((column) => (
            <HeaderCell
              align={column.numeric ? 'left' : 'inherit'}
              className={classes.cell}
              key={column.id}
              padding={column.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === column.id ? order : false}
            >
              {column.sortable === false ? (
                <HeaderTypography variant="body2">
                  {column.label}
                </HeaderTypography>
              ) : (
                <TableSortLabel
                  active={orderBy === getSortField(column)}
                  aria-label={`Column ${column.label}`}
                  direction={order || 'desc'}
                  onClick={createSortHandler(getSortField(column))}
                >
                  <HeaderTypography variant="body2">
                    {column.label}
                  </HeaderTypography>
                </TableSortLabel>
              )}
            </HeaderCell>
          ))}
        </TableRow>
      </TableHead>
    );
  },
);

export default ListingHeader;
