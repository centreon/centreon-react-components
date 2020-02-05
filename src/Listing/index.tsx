/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useRef, useEffect } from 'react';

import clsx from 'clsx';
import ResizeObserver from 'resize-observer-polyfill';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import DefaultTooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import TableCell from '@material-ui/core/TableCell';

import StyledTableRow from './Row';
import IconPowerSettings from '../Icon/IconPowerSettings';
import IconPowerSettingsDisable from '../Icon/IconPowerSettingsDisable';
import StyledCheckbox from './Checkbox';
import IconDelete from '../Icon/IconDelete';
import IconLibraryAdd from '../Icon/IconLibraryAdd';
import ListingHeader from './Header';
import TABLE_COLUMN_TYPES from './ColumnTypes';
import PaginationActions from './PaginationActions';
import StyledPagination from './Pagination';
import Tooltip from '../Tooltip';

const loadingIndicatorHeight = 3;

const haveSameIds = (a, b): boolean => a.id === b.id;

const BodyTableCell = withStyles({
  root: {
    fontSize: 13,
    lineHeight: 1.4,
    padding: '3px 4px',
  },
})(TableCell);

const styles = (): {} => ({
  paper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'none',
    background: 'none',
  },
  table: {
    boxShadow:
      '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
  },
  rowDisabled: {
    backgroundColor: 'rgba(0, 0, 0, 0.07) !important',
  },
  loadingIndicator: {
    width: '100%',
    height: loadingIndicatorHeight,
  },
});

const cumulativeOffset = (element): number => {
  if (!element || !element.offsetParent) {
    return 0;
  }

  return cumulativeOffset(element.offsetParent) + element.offsetTop;
};

interface Props {
  ariaLabel?: string;
  checkable?: boolean;
  classes;
  currentPage;
  columnConfiguration;
  emptyDataMessage?: string;
  grayRowCondition?: (row) => boolean;
  labelDelete?: string;
  labelDisplayedRows?: (fromToCount) => string;
  labelDuplicate?: string;
  labelEnableDisable?: string;
  labelRowsPerPage?: string;
  limit: number;
  loading?: boolean;
  loadingDataMessage?: string;
  onDelete?: (rows) => void;
  onDisable?: (rows) => void;
  onDuplicate?: (rows) => void;
  onEnable?: (rows) => void;
  onPaginate?: () => void;
  onPaginationLimitChanged?: () => void;
  onRowClick?: (row) => void;
  onSelectRows?: (rows) => void;
  onSort?: (sortParams) => void;
  paginated?: boolean;
  selectedRows?;
  sorto?: string;
  sortf?: string;
  tableData;
  totalRows: number;
}

const Listing = ({
  limit,
  columnConfiguration,
  tableData,
  classes,
  currentPage,
  totalRows,
  ariaLabel = '',
  checkable = false,
  emptyDataMessage = 'No results found',
  grayRowCondition = (): boolean => false,
  labelDelete = 'Delete',
  labelDisplayedRows = ({ from, to, count }): string =>
    `${from}-${to} of ${count}`,
  labelDuplicate = 'Duplicate',
  labelEnableDisable = 'Enable / Disable',
  labelRowsPerPage = 'Rows per page',
  loading = false,
  loadingDataMessage = 'Loading data',
  onEnable = (): void => undefined,
  onDelete = (): void => undefined,
  onDisable = (): void => undefined,
  onDuplicate = (): void => undefined,
  onPaginate = (): void => undefined,
  onPaginationLimitChanged = (): void => undefined,
  onRowClick = (): void => undefined,
  onSelectRows = (): void => undefined,
  onSort = (): void => undefined,
  paginated = true,
  selectedRows = [],
  sorto = undefined,
  sortf = undefined,
}: Props): JSX.Element => {
  const [tableTopOffset, setTableTopOffset] = useState(0);
  const [hovered, setHovered] = useState();

  const tableBody = useRef<Element>();

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      setTableTopOffset(cumulativeOffset(tableBody.current));
    });

    ro.observe(tableBody.current as Element);
  }, []);

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
    if (event.target.checked) {
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

  const hoverRow = (id) => (): void => {
    setHovered(id);
  };

  const clearHoveredRow = (): void => {
    if (hovered !== null) {
      setHovered(null);
    }
  };

  const isSelected = (row): boolean => {
    return selectedRowsInclude(row);
  };

  const getColumnCell = ({ row, column }): JSX.Element => {
    const cellByColumnType = {
      [TABLE_COLUMN_TYPES.number]: (): JSX.Element => (
        <BodyTableCell align="left">{row[column.id] || ''}</BodyTableCell>
      ),
      [TABLE_COLUMN_TYPES.string]: (): JSX.Element => (
        <BodyTableCell key={column.id} align="left">
          {column.image && (
            <img
              alt=""
              src={row.iconPath}
              style={{
                maxWidth: 21,
                display: 'inline-block',
                verticalAlign: 'middle',
                marginRight: 5,
              }}
            />
          )}
          {row[column.id] || ''}
        </BodyTableCell>
      ),
      [TABLE_COLUMN_TYPES.toggler]: (): JSX.Element => (
        <BodyTableCell align="left">
          {row[column.id] ? (
            <Tooltip
              label={labelEnableDisable}
              onClick={(e): void => {
                e.preventDefault();
                e.stopPropagation();
                onDisable([row]);
              }}
            >
              <IconPowerSettings
                onClick={(e): void => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDisable([row]);
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip
              label={labelEnableDisable}
              onClick={(e): void => {
                e.preventDefault();
                e.stopPropagation();
                onEnable([row]);
              }}
            >
              <IconPowerSettingsDisable
                active
                onClick={(e): void => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEnable([row]);
                }}
              />
            </Tooltip>
          )}
        </BodyTableCell>
      ),
      [TABLE_COLUMN_TYPES.widthVariation]: (): JSX.Element => (
        <BodyTableCell
          key={column.id}
          align="left"
          colSpan={isSelected(row) ? 1 : 5}
          style={{
            maxWidth: '145px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          <DefaultTooltip
            title={`${row[column.id]} (${row[column.subValue]})`}
            placement="top"
          >
            <span>{`${row[column.id]} (${row[column.subValue]})`}</span>
          </DefaultTooltip>
        </BodyTableCell>
      ),
      [TABLE_COLUMN_TYPES.multicolumn]: (): JSX.Element => (
        <BodyTableCell key={column.id} align="left">
          {column.columns.map((subColumn) => (
            <>
              {`${subColumn.label} ${row[subColumn.id]}`}
              {subColumn.type === 'percentage' ? '%' : null}
              {'   '}
            </>
          ))}
        </BodyTableCell>
      ),
      [TABLE_COLUMN_TYPES.hoverActions]: (): JSX.Element => (
        <BodyTableCell
          align="right"
          key={column.id}
          style={{
            width: 90,
            position: 'relative',
          }}
        >
          {hovered === row.id ? (
            <Box
              flexDirection="row"
              display="flex"
              style={{
                marginRight: -4,
                position: 'absolute',
                top: 3,
                right: 0,
              }}
            >
              <Box>
                <Tooltip
                  label={labelDelete}
                  onClick={(): void => {
                    onDelete([row]);
                  }}
                >
                  <IconDelete
                    onClick={(e): void => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDelete([row]);
                    }}
                  />
                </Tooltip>
              </Box>
              <Box>
                <Tooltip
                  label={labelDuplicate}
                  onClick={(): void => {
                    onDuplicate([row]);
                  }}
                >
                  <IconLibraryAdd
                    onClick={(e): void => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDuplicate([row]);
                    }}
                  />
                </Tooltip>
              </Box>
            </Box>
          ) : (
            ' '
          )}
        </BodyTableCell>
      ),
      [TABLE_COLUMN_TYPES.component]: (): JSX.Element => {
        const Component = column.Component({
          row,
          isRowSelected: isSelected(row),
        });

        return (
          Component && (
            <BodyTableCell align="left" key={column.id}>
              {Component}
            </BodyTableCell>
          )
        );
      },
    };

    return cellByColumnType[column.type]();
  };

  const emptyRows = limit - Math.min(limit, totalRows - currentPage * limit);

  const tableMaxHeight = (): string => {
    return `calc(100vh - ${tableTopOffset}px - 25px)`;
  };

  return (
    <>
      {loading && <LinearProgress className={classes.loadingIndicator} />}
      {!loading && <div className={classes.loadingIndicator} />}
      <Paper className={classes.paper}>
        {paginated ? (
          <StyledPagination
            rowsPerPageOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            labelDisplayedRows={labelDisplayedRows}
            labelRowsPerPage={labelRowsPerPage}
            colSpan={3}
            count={totalRows}
            rowsPerPage={limit}
            page={currentPage}
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
              padding: 0,
              background: '#fff',
            }}
            SelectProps={{
              native: true,
            }}
            onChangePage={onPaginate}
            onChangeRowsPerPage={onPaginationLimitChanged}
            ActionsComponent={PaginationActions}
          />
        ) : null}
        <div
          style={{
            overflow: 'visible',
            maxHeight: tableMaxHeight(),
          }}
        >
          <Table
            className={classes.table}
            aria-label={ariaLabel}
            size="small"
            stickyHeader
          >
            <ListingHeader
              numSelected={selectedRows.length}
              order={sorto}
              checkable={checkable}
              orderBy={sortf}
              onSelectAllClick={selectAllRows}
              onRequestSort={handleRequestSort}
              rowCount={limit - emptyRows}
              headRows={columnConfiguration}
            />

            <TableBody
              ref={tableBody}
              onMouseLeave={clearHoveredRow}
              style={{
                position: 'relative',
              }}
            >
              {tableData.map((row) => {
                const isRowSelected = isSelected(row);

                return (
                  <StyledTableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    onMouseEnter={hoverRow(row.id)}
                    className={clsx({
                      [classes.rowDisabled]: grayRowCondition(row),
                    })}
                    onClick={(): void => {
                      onRowClick(row);
                    }}
                  >
                    {checkable ? (
                      <BodyTableCell
                        align="left"
                        onClick={(event): void => selectRow(event, row)}
                        padding="checkbox"
                      >
                        <StyledCheckbox
                          checked={isRowSelected}
                          inputProps={{
                            'aria-label': `Select row ${row.id}`,
                          }}
                          color="primary"
                        />
                      </BodyTableCell>
                    ) : null}

                    {columnConfiguration.map((column) =>
                      getColumnCell({ column, row }),
                    )}
                  </StyledTableRow>
                );
              })}
              {tableData.length < 1 && (
                <StyledTableRow tabIndex={-1}>
                  <BodyTableCell colSpan={6} align="center">
                    {loading ? loadingDataMessage : emptyDataMessage}
                  </BodyTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(Listing);
