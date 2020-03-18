/* eslint-disable react/prop-types */

import React from 'react';

import { makeStyles, Button } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

import Listing from '.';
import ColumnTypes from './ColumnTypes';

export default { title: 'Listing' };

const useStyles = makeStyles((theme) => ({
  listing: {
    backgroundColor: theme.palette.background.default,
  },
}));

const ComponentColumn = ({ row, isRowSelected, Cell }): JSX.Element => (
  <Cell>
    <span>
      {'I am '}
      <b>{`${isRowSelected ? 'selected' : 'not selected'}`}</b>
      {' / '}
    </span>
    <span>
      {'I am '}
      <b>{`${row.active ? 'active' : 'not active'}`}</b>
    </span>
  </Cell>
);

const configuration = [
  {
    id: 'name',
    label: 'Name',
    type: ColumnTypes.string,
    getFormattedString: ({ name }): string => name,
  },
  { id: 'active', label: 'Active', type: ColumnTypes.toggler },
  {
    id: 'description',
    label: 'Description',
    type: ColumnTypes.string,
    getFormattedString: ({ description }): string => description,
  },
  {
    id: '#',
    label: 'Custom',
    type: ColumnTypes.component,
    Component: ComponentColumn,
  },
];

const noOp = (): void => undefined;

const tenElements = new Array(10).fill(0);

const listing = [...tenElements].map((_, index) => ({
  id: index,
  name: `E${index}`,
  description: `Entity ${index}`,
  active: index % 2 === 0,
  selected: index % 3 === 0,
}));

const rowColorConditions = [
  {
    name: 'inactive',
    condition: ({ active }): boolean => !active,
    color: grey[500],
  },
];

const Story = (props): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.listing}>
      <Listing
        columnConfiguration={configuration}
        onDelete={noOp}
        onSort={noOp}
        onDuplicate={noOp}
        onPaginate={noOp}
        onPaginationLimitChanged={noOp}
        limit={listing.length}
        currentPage={0}
        totalRows={listing.length}
        tableData={listing}
        rowColorConditions={rowColorConditions}
        selectedRows={listing.filter((row) => row.selected)}
        checkable
        {...props}
      />
    </div>
  );
};

export const normal = (): JSX.Element => <Story />;

export const loadingWithNoData = (): JSX.Element => {
  return <Story tableData={[]} totalRows={0} loading />;
};

export const loadingWithData = (): JSX.Element => {
  return <Story loading />;
};

const Actions = (
  <Button variant="contained" color="primary">
    Action
  </Button>
);

export const withActions = (): JSX.Element => <Story Actions={Actions} />;
