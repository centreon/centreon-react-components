/* eslint-disable react/no-unused-prop-types */

import * as React from 'react';

import { equals, path } from 'ramda';

import { TableRowProps, TableRow, makeStyles, Theme } from '@material-ui/core';

import Cell from './Cell';
import DataCell from './Cell/DataCell';
import Checkbox from './Checkbox';
import { RowColorCondition } from './models';

const useStyles = makeStyles<Theme>((theme) => ({
  row: {
    display: 'contents',
    width: '100%',
    cursor: 'pointer',
    backgroundColor: theme.palette.common.white,
  },
}));

type Props = {
  children;
  isHovered?: boolean;
  isSelected?: boolean;
  rowStyle;
} & TableRowProps;

const ListingRow = ({
  children,
  tabIndex,
  onMouseOver,
  onFocus,
  onClick,
  rowStyle,
}: Props & TableRowProps): JSX.Element => {
  const classes = useStyles();

  return (
    <TableRow
      tabIndex={tabIndex}
      onMouseOver={onMouseOver}
      onFocus={onFocus}
      onClick={onClick}
      component="div"
      style={rowStyle}
      className={classes.row}
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

const getPropertyFromProps = <T extends unknown>({ props, property }) => {
  return path<T>(['data', 'properties', property], props);
};

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
      checkable,
      disableRowCheckCondition,
      columnConfiguration,
      rowHeight,
      rowColorConditions,
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
          rowStyle={{
            display: 'grid',
            gridTemplateColumns: getGridTemplateColumn(),
            height: rowHeight,
          }}
        >
          {checkable && (
            <Cell
              align="left"
              onClick={(event): void => selectRow(event, row)}
              isRowHovered={isRowHovered}
              row={row}
              rowColorConditions={rowColorConditions}
            >
              <Checkbox
                checked={isRowSelected}
                inputProps={{
                  'aria-label': `Select row ${row.id}`,
                }}
                disabled={disableRowCheckCondition(row)}
              />
            </Cell>
          )}

          {columnConfiguration.map((column) => (
            <DataCell
              key={`${row.id}-${column.id}`}
              column={column}
              row={row}
              listingCheckable={checkable}
              isRowSelected={isRowSelected}
              isRowHovered={isRowHovered}
              rowColorConditions={rowColorConditions}
            />
          ))}
        </ListingRow>
      </div>
    );
  },
  (prevProps, nextProps) => {
    const prevRow = path<Record<string, unknown>>(
      ['data', 'items', prevProps.index],
      prevProps,
    );
    const nextRow = path<Record<string, unknown>>(
      ['data', 'items', nextProps.index],
      nextProps,
    );

    const prevIsRowSelected = getPropertyFromProps<(row) => boolean>({
      property: 'isSelected',
      props: prevProps,
    })?.(prevRow);
    const nextIsRowSelected = getPropertyFromProps<(row) => boolean>({
      property: 'isSelected',
      props: nextProps,
    })?.(nextRow);
    const previousRowColorConditions = getPropertyFromProps<
      Array<RowColorCondition>
    >({
      property: 'rowColorConditions',
      props: prevProps,
    });
    const nextRowColorConditions = getPropertyFromProps<
      Array<RowColorCondition>
    >({
      property: 'rowColorConditions',
      props: nextProps,
    });
    const prevRowColors = previousRowColorConditions?.map(({ condition }) =>
      condition(prevRow),
    );
    const nextRowColors = nextRowColorConditions?.map(({ condition }) =>
      condition(nextRow),
    );
    return (
      equals(
        getPropertyFromProps({ property: 'hoveredRowId', props: prevProps }) ===
          prevRow?.id,
        getPropertyFromProps({ property: 'hoveredRowId', props: nextProps }) ===
          nextRow?.id,
      ) &&
      equals(prevRow, nextRow) &&
      equals(prevIsRowSelected, nextIsRowSelected) &&
      equals(prevRowColors, nextRowColors)
    );
  },
);

export default Row;
