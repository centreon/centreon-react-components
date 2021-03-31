import React, { useState, useRef, RefObject } from 'react';

import { equals } from 'ramda';

import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  Paper,
  LinearProgress,
  TableRow,
  Checkbox,
} from '@material-ui/core';

import ListingHeader from './Header';
import ListingRow from './Row';
import PaginationActions from './PaginationActions';
import StyledPagination from './Pagination';
import ListingLoadingSkeleton from './Skeleton';
import useResizeObserver from './useResizeObserver';
import getCumulativeOffset from './getCumulativeOffset';
import ColumnCell, { BodyTableCell } from './ColumnCell';

const loadingIndicatorHeight = 3;

const useStyles = makeStyles<Theme>((theme) => ({
  actionBar: {
    alignItems: 'center',
    display: 'flex',
  },
  actions: {
    padding: theme.spacing(1),
  },
  loadingIndicator: {
    height: loadingIndicatorHeight,
    width: '100%',
  },
  paginationElement: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginLeft: 'auto',
    padding: 0,
  },
  paperElement: {
    background: 'none',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
}));

type RowId = number | string;

export interface Props {
  Actions?: JSX.Element;
  checkable?: boolean;
  columnConfiguration;
  currentPage?;
  disableRowCheckCondition?;
  emptyDataMessage?: string;
  expanded?: boolean;
  getId?: (row) => RowId;
  innerScrollDisabled?: boolean;
  labelDisplayedRows?: (fromToCount) => string;
  labelRowsPerPage?: string;
  limit?: number;
  loading?: boolean;
  loadingDataMessage?: string;
  onPaginate?: (event, value) => void;
  onPaginationLimitChanged?: (event) => void;
  onRowClick?: (row) => void;
  onSelectRows?: (rows) => void;
  onSort?: (sortParams) => void;
  paginated?: boolean;
  rowColorConditions?;
  selectedRows?;
  sortf?: string;
  sorto?: 'asc' | 'desc';
  tableData?;
  totalRows?;
}

const Listing = ({
  limit = 10,
  columnConfiguration,
  tableData = [],
  currentPage = 0,
  totalRows = 0,
  checkable = false,
  disableRowCheckCondition = (): boolean => false,
  emptyDataMessage = 'No results found',
  rowColorConditions = [],
  labelDisplayedRows = ({ from, to, count }): string =>
    `${from}-${to} of ${count}`,
  labelRowsPerPage = 'Rows per page',
  loading = false,
  onPaginate = (): void => undefined,
  onPaginationLimitChanged = (): void => undefined,
  onRowClick = (): void => undefined,
  onSelectRows = (): void => undefined,
  onSort = (): void => undefined,
  getId = ({ id }) => id,
  paginated = true,
  selectedRows = [],
  sorto = undefined,
  sortf = undefined,
  Actions,
  innerScrollDisabled = false,
}: Props): JSX.Element => {
  const [tableTopOffset, setTableTopOffset] = useState(0);
  const [hoveredRowId, setHoveredRowId] = useState<RowId | null>(null);

  const paperRef = useRef<HTMLDivElement>();
  const paginationElement = useRef<HTMLDivElement>();
  const tableHeaderElement = useRef<HTMLTableSectionElement>();

  const classes = useStyles();

  useResizeObserver({
    onResize: () => {
      setTableTopOffset(getCumulativeOffset(paperRef.current));
    },
    ref: paperRef,
  });

  const selectedRowsInclude = (row): boolean => {
    return !!selectedRows.find((includedRow) =>
      equals(getId(includedRow), getId(row)),
    );
  };

  const handleRequestSort = (_, property): void => {
    const isDesc = sortf === property && sorto === 'desc';

    onSort({
      order: isDesc ? 'asc' : 'desc',
      orderBy: property,
    });
  };

  const selectAllRows = (event): void => {
    if (
      event.target.checked &&
      event.target.getAttribute('data-indeterminate') === 'false'
    ) {
      onSelectRows(tableData);
      return;
    }

    onSelectRows([]);
  };

  const selectRow = (event, row): void => {
    event.preventDefault();
    event.stopPropagation();

    if (selectedRowsInclude(row)) {
      onSelectRows(
        selectedRows.filter((entity) => !equals(getId(entity), getId(row))),
      );
      return;
    }
    onSelectRows([...selectedRows, row]);
  };

  const hoverRow = (row): void => {
    if (equals(hoveredRowId, getId(row))) {
      return;
    }
    setHoveredRowId(getId(row));
  };

  const clearHoveredRow = (): void => {
    setHoveredRowId(null);
  };

  const isSelected = (row): boolean => {
    return selectedRowsInclude(row);
  };

  const onLimitChanged = (event): void => {
    onPaginationLimitChanged(event);
    onPaginate(null, 0);
  };

  const emptyRows = limit - Math.min(limit, totalRows - currentPage * limit);

  const tableMaxHeight = (): string => {
    if (innerScrollDisabled) {
      return '100%';
    }

    return `calc(100vh - ${tableTopOffset}px - ${paginationElement.current?.clientHeight}px - ${tableHeaderElement.current?.clientHeight}px)`;
  };

  return (
    <>
      {loading && tableData.length > 0 && (
        <LinearProgress className={classes.loadingIndicator} />
      )}
      {(!loading || (loading && tableData.length < 1)) && (
        <div className={classes.loadingIndicator} />
      )}
      <div
        className={classes.paperElement}
        ref={paperRef as RefObject<HTMLDivElement>}
      >
        <div
          className={classes.actionBar}
          ref={paginationElement as RefObject<HTMLDivElement>}
        >
          <div className={classes.actions}>{Actions}</div>
          {paginated ? (
            <StyledPagination
              ActionsComponent={PaginationActions}
              SelectProps={{
                native: true,
              }}
              className={classes.paginationElement}
              colSpan={3}
              count={totalRows}
              labelDisplayedRows={labelDisplayedRows}
              labelRowsPerPage={labelRowsPerPage}
              page={currentPage}
              rowsPerPage={limit}
              rowsPerPageOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              onChangePage={onPaginate}
              onChangeRowsPerPage={onLimitChanged}
            />
          ) : null}
        </div>
        <Paper
          square
          elevation={1}
          style={{
            maxHeight: tableMaxHeight(),
            overflow: 'auto',
          }}
        >
          <Table stickyHeader size="small">
            <ListingHeader
              checkable={checkable}
              headColumns={columnConfiguration}
              numSelected={selectedRows.length}
              order={sorto}
              orderBy={sortf}
              ref={tableHeaderElement as RefObject<HTMLTableSectionElement>}
              rowCount={limit - emptyRows}
              onRequestSort={handleRequestSort}
              onSelectAllClick={selectAllRows}
            />

            <TableBody
              style={{
                position: 'relative',
              }}
              onMouseLeave={clearHoveredRow}
            >
              {tableData.map((row) => {
                const isRowSelected = isSelected(row);
                const isRowHovered = equals(hoveredRowId, getId(row));

                return (
                  <ListingRow
                    isHovered={isRowHovered}
                    isSelected={isRowSelected}
                    key={getId(row)}
                    row={row}
                    rowColorConditions={rowColorConditions}
                    tabIndex={-1}
                    onClick={(): void => {
                      onRowClick(row);
                    }}
                    onFocus={(): void => hoverRow(row)}
                    onMouseOver={(): void => hoverRow(row)}
                  >
                    {checkable ? (
                      <BodyTableCell
                        align="left"
                        padding="checkbox"
                        onClick={(event): void => selectRow(event, row)}
                      >
                        <Checkbox
                          checked={isRowSelected}
                          color="primary"
                          disabled={disableRowCheckCondition(row)}
                          inputProps={{
                            'aria-label': `Select row ${getId(row)}`,
                          }}
                          size="small"
                        />
                      </BodyTableCell>
                    ) : null}

                    {columnConfiguration.map((column) => (
                      <ColumnCell
                        column={column}
                        isRowHovered={isRowHovered}
                        isRowSelected={isRowSelected}
                        key={`${getId(row)}-${column.id}`}
                        listingCheckable={checkable}
                        row={row}
                      />
                    ))}
                  </ListingRow>
                );
              })}
              {tableData.length < 1 && (
                <TableRow tabIndex={-1}>
                  <BodyTableCell
                    align="center"
                    colSpan={columnConfiguration.length + 1}
                  >
                    {loading ? <ListingLoadingSkeleton /> : emptyDataMessage}
                  </BodyTableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </>
  );
};

export default Listing;
