/* eslint-disable react/prop-types */

import React from 'react';

import { makeStyles } from '@material-ui/core';

import Listing from '.';
import ColumnTypes from './ColumnTypes';

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
        grayRowCondition={(row): boolean => !row.active}
        selectedRows={listing.filter((row) => row.selected)}
        checkable
        {...props}
      />
    </div>
  );
};

export const normal = (): JSX.Element => <Story />;
