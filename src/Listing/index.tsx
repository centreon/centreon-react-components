import React, { useState, useRef, RefObject } from 'react';

import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import memoize from 'memoize-one';
import { pathOr, subtract } from 'ramda';

import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  LinearProgress,
  TableRow,
  useTheme,
} from '@material-ui/core';

import useMemoComponent from '../utils/useMemoComponent';

import ListingHeader, { headerHeight } from './Header';
import Row from './Row';
import PaginationActions from './PaginationActions';
import StyledPagination from './Pagination';
import ListingLoadingSkeleton from './Skeleton';
import useResizeObserver from './useResizeObserver';
import getCumulativeOffset from './getCumulativeOffset';
import { BodyTableCell } from './ColumnCell';

const loadingIndicatorHeight = 3;

const haveSameIds = (a, b): boolean => a.id === b.id;

const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'none',
  },
  actionBar: {
    display: 'flex',
    alignItems: 'center',
  },
  actions: {
    padding: theme.spacing(1),
  },
  loadingIndicator: {
    width: '100%',
    height: loadingIndicatorHeight,
  },
  table: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  tableBody: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.common.white,
  },
  emptyDataRow: {
    display: 'contents',
  },
  emptyDataCell: {
    paddingLeft: theme.spacing(2),
  },
  listingHeader: {
    display: 'grid',
    backgroundColor: theme.palette.common.white,
  },
}));

const rowHeight = 29;

const itemKey = (index, data) => data.items[index].id;

const createItemsData = memoize(({ items, properties }) => ({
  items,
  properties,
}));

export interface Props {
  checkable?: boolean;
  currentPage?;
  columnConfiguration;
  emptyDataMessage?: string;
  rowColorConditions?;
  labelRowsPerPage?: string;
  limit?: number;
  loading?: boolean;
  loadingDataMessage?: string;
  paginated?: boolean;
  selectedRows?;
  sorto?: 'asc' | 'desc';
  sortf?: string;
  tableData?;
  totalRows?;
  innerScrollDisabled?: boolean;
  expanded?: boolean;
  Actions?: JSX.Element;
  disableRowCheckCondition?;
  labelDisplayedRows?: (fromToCount) => string;
  onPaginate?: (event, value) => void;
  onPaginationLimitChanged?: (event) => void;
  onRowClick?: (row) => void;
  onSelectRows?: (rows) => void;
  onSort?: (sortParams) => void;
}

const Listing = ({
  limit = 10,
  columnConfiguration,
  tableData = [],
  currentPage = 0,
  totalRows = 0,
  checkable = false,
  emptyDataMessage = 'No results found',
  rowColorConditions = [],
  labelRowsPerPage = 'Rows per page',
  loading = false,
  paginated = true,
  selectedRows = [],
  sorto = undefined,
  sortf = undefined,
  innerScrollDisabled = false,
  Actions,
  disableRowCheckCondition = (): boolean => false,
  onPaginate = (): void => undefined,
  onPaginationLimitChanged = (): void => undefined,
  onRowClick = (): void => undefined,
  onSelectRows = (): void => undefined,
  onSort = (): void => undefined,
  labelDisplayedRows = ({ from, to, count }): string =>
    `${from}-${to} of ${count}`,
}: Props): JSX.Element => {
  const [tableTopOffset, setTableTopOffset] = useState(0);
  const [hoveredRowId, setHoveredRowId] = useState<string | number | null>(
    null,
  );

  const containerRef = useRef<HTMLDivElement>();
  const actionBarRef = useRef<HTMLDivElement>();
  const fixedListRef = useRef<HTMLDivElement>();

  const classes = useStyles();

  const theme = useTheme();

  useResizeObserver({
    ref: containerRef,
    onResize: () => {
      setTableTopOffset(getCumulativeOffset(containerRef.current));
    },
  });

  const selectedRowsInclude = (row): boolean => {
    return !!selectedRows.find((includedRow) => haveSameIds(includedRow, row));
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
      onSelectRows(selectedRows.filter((entity) => !haveSameIds(entity, row)));
      return;
    }
    onSelectRows([...selectedRows, row]);
  };

  const hoverRow = (id): void => {
    if (hoveredRowId === id) {
      return;
    }
    setHoveredRowId(id);
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

    return `calc(100vh - ${tableTopOffset}px - ${
      actionBarRef.current?.offsetHeight
    }px - ${headerHeight}px - ${loadingIndicatorHeight}px - ${theme.spacing(
      1,
    )}px)`;
  };

  const getGridTemplateColumn = (): string => {
    const checkbox = checkable ? 'min-content ' : '';

    const columns = columnConfiguration
      .map(({ width }) => {
        return width || '1fr';
      })
      .join(' ');

    return `${checkbox}${columns}`;
  };

  const itemsData = createItemsData({
    items: tableData,
    properties: {
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
    },
  });

  return (
    <>
      {loading && tableData.length > 0 && (
        <LinearProgress className={classes.loadingIndicator} />
      )}
      {(!loading || (loading && tableData.length < 1)) && (
        <div className={classes.loadingIndicator} />
      )}
      <div
        className={classes.container}
        ref={containerRef as RefObject<HTMLDivElement>}
      >
        <div
          className={classes.actionBar}
          ref={actionBarRef as RefObject<HTMLDivElement>}
        >
          <div className={classes.actions}>{Actions}</div>
          {paginated ? (
            <StyledPagination
              rowsPerPageOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              labelDisplayedRows={labelDisplayedRows}
              labelRowsPerPage={labelRowsPerPage}
              colSpan={3}
              count={totalRows}
              rowsPerPage={limit}
              page={currentPage}
              SelectProps={{
                native: true,
              }}
              onChangePage={onPaginate}
              onChangeRowsPerPage={onLimitChanged}
              ActionsComponent={PaginationActions}
            />
          ) : null}
        </div>
        <Table
          size="small"
          stickyHeader
          className={classes.table}
          style={{
            overflow: 'hidden',
            maxHeight: tableMaxHeight(),
            width: '100%',
            height: '100%',
          }}
          component="div"
        >
          <div
            className={classes.listingHeader}
            style={{
              gridTemplateColumns: getGridTemplateColumn(),
              paddingRight: subtract(
                pathOr(
                  0,
                  ['current', 'parentElement', 'offsetWidth'],
                  fixedListRef,
                ),
                pathOr(
                  0,
                  ['current', 'parentElement', 'clientWidth'],
                  fixedListRef,
                ),
              ),
            }}
          >
            <ListingHeader
              numSelected={selectedRows.length}
              order={sorto}
              checkable={checkable}
              orderBy={sortf}
              onSelectAllClick={selectAllRows}
              onRequestSort={handleRequestSort}
              rowCount={limit - emptyRows}
              headColumns={columnConfiguration}
            />
          </div>
          <AutoSizer>
            {({ height, width }) => (
              <TableBody
                onMouseLeave={clearHoveredRow}
                className={classes.tableBody}
                component="div"
              >
                {tableData.length < 1 && (
                  <TableRow
                    tabIndex={-1}
                    className={classes.emptyDataRow}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: getGridTemplateColumn(),
                    }}
                    component="div"
                  >
                    <BodyTableCell
                      className={classes.emptyDataCell}
                      style={{
                        gridColumn: `auto / span ${
                          columnConfiguration.length + 1
                        }`,
                      }}
                      align="center"
                    >
                      {loading ? <ListingLoadingSkeleton /> : emptyDataMessage}
                    </BodyTableCell>
                  </TableRow>
                )}
                <FixedSizeList
                  height={
                    height - (actionBarRef.current?.clientHeight || rowHeight)
                  }
                  width={width}
                  itemCount={tableData.length}
                  itemSize={rowHeight}
                  itemKey={itemKey}
                  itemData={itemsData}
                  overscanCount={5}
                  innerRef={fixedListRef}
                >
                  {Row}
                </FixedSizeList>
              </TableBody>
            )}
          </AutoSizer>
        </Table>
      </div>
    </>
  );
};

interface MemoizedListingProps extends Props {
  memoProps?: Array<unknown>;
}

export const MemoizedListing = ({
  memoProps = [],
  limit = 10,
  columnConfiguration,
  tableData = [],
  currentPage = 0,
  totalRows = 0,
  checkable = false,
  emptyDataMessage = 'No results found',
  rowColorConditions = [],
  labelRowsPerPage = 'Rows per page',
  loading = false,
  paginated = true,
  selectedRows = [],
  sorto = undefined,
  sortf = undefined,
  innerScrollDisabled = false,
  ...props
}: MemoizedListingProps): JSX.Element =>
  useMemoComponent({
    Component: (
      <Listing
        limit={limit}
        columnConfiguration={columnConfiguration}
        tableData={tableData}
        currentPage={currentPage}
        totalRows={totalRows}
        checkable={checkable}
        emptyDataMessage={emptyDataMessage}
        rowColorConditions={rowColorConditions}
        labelRowsPerPage={labelRowsPerPage}
        loading={loading}
        paginated={paginated}
        selectedRows={selectedRows}
        sorto={sorto}
        sortf={sortf}
        innerScrollDisabled={innerScrollDisabled}
        {...props}
      />
    ),
    memoProps: [
      ...memoProps,
      limit,
      tableData,
      currentPage,
      totalRows,
      checkable,
      emptyDataMessage,
      labelRowsPerPage,
      loading,
      paginated,
      selectedRows,
      sorto,
      sortf,
      innerScrollDisabled,
    ],
  });

export default Listing;
