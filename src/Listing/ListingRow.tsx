import * as React from 'react';

import ListingRow from './Row';

const ListRow = ({
  row,
  isRowHovered,
  isRowSelected,
  rowColorConditions,
  disableRowCheckCondition,
  onRowClick,
  selectRow,
  hoverRow,
  checkable,
  columnConfiguration,
}): JSX.Element => (
  <ListingRow
    tabIndex={-1}
    onMouseOver={(): void => hoverRow(row.id)}
    onFocus={(): void => hoverRow(row.id)}
    onClick={(): void => {
      onRowClick(row);
    }}
    row={row}
    rowColorConditions={rowColorConditions}
    checkable={checkable}
    columnConfiguration={columnConfiguration}
    disableRowCheckCondition={disableRowCheckCondition}
    selectRow={selectRow}
    isRowHovered={isRowHovered}
    isRowSelected={isRowSelected}
  />
);

const Row = ({
  item,
  isRowHovered,
  isRowSelected,
  rowStyle,
  rowColorConditions,
  disableRowCheckCondition,
  onRowClick,
  selectRow,
  hoverRow,
  checkable,
  columnConfiguration,
}) => (
  <div style={rowStyle}>
    <ListRow
      isRowHovered={isRowHovered}
      isRowSelected={isRowSelected}
      row={item}
      rowColorConditions={rowColorConditions}
      checkable={checkable}
      columnConfiguration={columnConfiguration}
      disableRowCheckCondition={disableRowCheckCondition}
      selectRow={selectRow}
      onRowClick={onRowClick}
      hoverRow={hoverRow}
    />
  </div>
);

export default Row;
