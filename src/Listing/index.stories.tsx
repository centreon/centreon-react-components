/* eslint-disable react/prop-types */

import React from 'react';

import { makeStyles, Button } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

import { ColumnType } from './models';

import Listing from '.';

export default { title: 'Listing' };

const useStyles = makeStyles((theme) => ({
  listing: {
    backgroundColor: theme.palette.background.default,
  },
}));

const ComponentColumn = ({ row, isRowSelected }): JSX.Element => (
  <>
    <span>
      {'I am '}
      <b>{`${isRowSelected ? 'selected' : 'not selected'}`}</b>
      {' / '}
    </span>
    <span>
      {'I am '}
      <b>{`${row.active ? 'active' : 'not active'}`}</b>
    </span>
  </>
);

const configuration = [
  {
    getFormattedString: ({ name }): string => name,
    id: 'name',
    label: 'Name',
    type: ColumnType.string,
  },
  {
    getFormattedString: ({ description }): string => description,
    id: 'description',
    label: 'Description',
    type: ColumnType.string,
  },
  {
    Component: ComponentColumn,
    id: '#',
    label: 'Custom',
    type: ColumnType.component,
  },
];

const noOp = (): void => undefined;

const tenElements = new Array(10).fill(0);

const listing = [...tenElements].map((_, index) => ({
  active: index % 2 === 0,
  description: `Entity ${index}`,
  disableCheckbox: index % 4 === 0,
  id: index,
  name: `E${index}`,
  selected: index % 3 === 0,
}));

const rowColorConditions = [
  {
    color: grey[500],
    condition: ({ active }): boolean => !active,
    name: 'inactive',
  },
];

const Story = ({ disableCheckable = false, ...props }): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.listing}>
      <Listing
        checkable={!disableCheckable}
        columnConfiguration={configuration}
        currentPage={0}
        disableRowCheckCondition={(row): boolean => row.disableCheckbox}
        limit={listing.length}
        rowColorConditions={rowColorConditions}
        selectedRows={listing.filter((row) => row.selected)}
        tableData={listing}
        totalRows={listing.length}
        onPaginate={noOp}
        onPaginationLimitChanged={noOp}
        onSort={noOp}
        {...props}
      />
    </div>
  );
};

export const normal = (): JSX.Element => <Story />;

export const loadingWithNoData = (): JSX.Element => {
  return <Story loading tableData={[]} totalRows={0} />;
};

export const loadingWithData = (): JSX.Element => {
  return <Story loading />;
};

const Actions = (
  <Button color="primary" size="small" variant="contained">
    Action
  </Button>
);

export const withActions = (): JSX.Element => <Story Actions={Actions} />;

export const withoutCheckboxes = (): JSX.Element => <Story disableCheckable />;
