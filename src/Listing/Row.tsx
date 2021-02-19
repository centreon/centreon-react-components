/* eslint-disable react/no-unused-prop-types */

import * as React from 'react';

import { equals } from 'ramda';
import clsx from 'clsx';

import {
  TableRowProps,
  TableRow,
  makeStyles,
  Theme,
  fade,
  Checkbox,
} from '@material-ui/core';

import { RowColorCondition } from './models';
import MemoizedColumnCell, { BodyTableCell } from './ColumnCell';

const useStyles = (rowColorConditions): (() => Record<string, string>) =>
  makeStyles<Theme>((theme) => {
    const rowColorClasses = rowColorConditions.reduce(
      (rowColorConditionClasses, { name, color }) => ({
        ...rowColorConditionClasses,
        [name]: {
          backgroundColor: color,
        },
      }),
      {},
    );

    return {
      row: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        boxSizing: 'border-box',
        minWidth: '100%',
        width: '100%',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: fade(theme.palette.primary.main, 0.08),
        },
      },
      ...rowColorClasses,
    };
  });

type Props = {
  isRowHovered?: boolean;
  isRowSelected?: boolean;
  row;
  rowColorConditions;
  checkable;
  selectRow;
  disableRowCheckCondition;
  columnConfiguration;
} & TableRowProps;

const getRowColor = ({ conditions, row }): RowColorCondition =>
  conditions.find(({ condition }) => condition(row));

const Row = React.memo<Props>(
  ({
    checkable,
    tabIndex,
    onMouseOver,
    onFocus,
    onClick,
    selectRow,
    disableRowCheckCondition,
    row,
    rowColorConditions,
    columnConfiguration,
    isRowSelected,
    isRowHovered,
  }: Props & TableRowProps): JSX.Element => {
    const classes = useStyles(rowColorConditions)();

    const rowColor = getRowColor({ conditions: rowColorConditions, row });

    return (
      <TableRow
        tabIndex={tabIndex}
        onMouseOver={onMouseOver}
        className={clsx([classes.row, classes[rowColor?.name]])}
        onFocus={onFocus}
        onClick={onClick}
        component="div"
      >
        {checkable ? (
          <BodyTableCell
            align="left"
            onClick={(event): void => selectRow(event, row)}
            padding="checkbox"
            component="div"
          >
            <Checkbox
              size="small"
              color="primary"
              checked={isRowSelected}
              inputProps={{
                'aria-label': `Select row ${row.id}`,
              }}
              disabled={disableRowCheckCondition(row)}
            />
          </BodyTableCell>
        ) : null}

        {columnConfiguration.map((column) => (
          <MemoizedColumnCell
            key={`${row.id}-${column.id}`}
            column={column}
            row={row}
            listingCheckable={checkable}
            isRowSelected={isRowSelected || false}
            isRowHovered={isRowHovered || false}
          />
        ))}
      </TableRow>
    );
  },
  (prevProps, nextProps) => {
    return (
      equals(prevProps.isRowHovered, nextProps.isRowHovered) &&
      equals(prevProps.isRowSelected, nextProps.isRowSelected) &&
      equals(prevProps.row, nextProps.row) &&
      equals(prevProps.className, nextProps.className) &&
      equals(
        getRowColor({
          conditions: prevProps.rowColorConditions,
          row: prevProps.row,
        }),
        getRowColor({
          conditions: nextProps.rowColorConditions,
          row: nextProps.row,
        }),
      )
    );
  },
);

export default Row;
