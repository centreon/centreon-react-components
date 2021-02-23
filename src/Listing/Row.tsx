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
import ColumnCell, { BodyTableCell } from './ColumnCell';

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
        display: 'contents',
        width: '100%',
        cursor: 'pointer',
        backgroundColor: theme.palette.common.white,
        '&:hover': {
          backgroundColor: fade(theme.palette.primary.main, 0.08),
        },
      },
      ...rowColorClasses,
    };
  });

type Props = {
  children;
  isHovered?: boolean;
  isSelected?: boolean;
  row;
  rowColorConditions;
  rowStyle;
} & TableRowProps;

const getRowColor = ({ conditions, row }): RowColorCondition =>
  conditions.find(({ condition }) => condition(row));

const ListingRow = ({
  children,
  tabIndex,
  onMouseOver,
  onFocus,
  onClick,
  row,
  rowColorConditions,
  rowStyle,
}: Props & TableRowProps): JSX.Element => {
  const classes = useStyles(rowColorConditions)();

  const rowColor = getRowColor({ conditions: rowColorConditions, row });

  return (
    <TableRow
      tabIndex={tabIndex}
      onMouseOver={onMouseOver}
      onFocus={onFocus}
      onClick={onClick}
      component="div"
      style={rowStyle}
      className={clsx([classes.row, classes[rowColor?.name]])}
    >
      {children}
    </TableRow>
  );
};

interface RowProps {
  index: number;
  style;
  data;
}

const Row = React.memo(
  ({ index, style, data }: RowProps): JSX.Element => {
    const row = data.items[index];

    const {
      hoveredRowId,
      isSelected,
      hoverRow,
      selectRow,
      onRowClick,
      getGridTemplateColumn,
      rowColorConditions,
      checkable,
      disableRowCheckCondition,
      columnConfiguration,
      rowHeight,
    } = data.properties;

    const isRowHovered = hoveredRowId === row.id;
    const isRowSelected = isSelected(row);

    return (
      <div style={style}>
        <ListingRow
          tabIndex={-1}
          key={row.id}
          onMouseOver={(): void => hoverRow(row.id)}
          onFocus={(): void => hoverRow(row.id)}
          onClick={(): void => {
            onRowClick(row);
          }}
          isHovered={isRowHovered}
          isSelected={isRowSelected}
          row={row}
          rowStyle={{
            display: 'grid',
            gridTemplateColumns: getGridTemplateColumn(),
            height: rowHeight,
          }}
          rowColorConditions={rowColorConditions}
        >
          {checkable && (
            <BodyTableCell
              align="left"
              onClick={(event): void => selectRow(event, row)}
              component="div"
            >
              <Checkbox
                size="small"
                color="primary"
                checked={isRowSelected}
                style={{ padding: 4 }}
                inputProps={{
                  'aria-label': `Select row ${row.id}`,
                }}
                disabled={disableRowCheckCondition(row)}
              />
            </BodyTableCell>
          )}

          {columnConfiguration.map((column) => (
            <ColumnCell
              key={`${row.id}-${column.id}`}
              column={column}
              row={row}
              listingCheckable={checkable}
              isRowSelected={isRowSelected}
              isRowHovered={isRowHovered}
            />
          ))}
        </ListingRow>
      </div>
    );
  },
  (prevProps, nextProps) => {
    const prevRow = prevProps.data.items[prevProps.index];
    const nextRow = nextProps.data.items[nextProps.index];

    const prevIsRowSelected = prevProps.data.properties.isSelected(prevRow);
    const nextIsRowSelected = nextProps.data.properties.isSelected(nextRow);
    return (
      equals(
        prevProps.data.properties.hoveredRowId === prevRow.id,
        nextProps.data.properties.hoveredRowId === nextRow.id,
      ) &&
      equals(prevRow, nextRow) &&
      equals(prevIsRowSelected, nextIsRowSelected) &&
      equals(
        getRowColor({
          conditions: prevProps.data.properties.rowColorConditions,
          row: prevRow,
        }),
        getRowColor({
          conditions: nextProps.data.properties.rowColorConditions,
          row: nextRow,
        }),
      )
    );
  },
);

export default Row;
