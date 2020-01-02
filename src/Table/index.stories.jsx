import React from 'react';

import EntityTable from './TableCustom';
import ColumnTypes from './ColumnTypes';

export default { title: 'EntityTable' };

const configuration = [
  { id: 'name', label: 'Name', type: ColumnTypes.string },
  { id: 'active', label: 'Active', type: ColumnTypes.toggler },
  { id: 'description', label: 'Description', type: ColumnTypes.string },
];

const noOp = () => undefined;

const listing = [...Array(10).keys()].map((index) => ({
  id: index,
  name: `E${index}`,
  description: `Entity ${index}`,
  active: index % 2 === 0,
  selected: index % 3 === 0,
}));

const Story = (props) => (
  <EntityTable
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
    grayRowCondition={(row) => !row.active}
    selectedRows={listing.filter((row) => row.selected)}
    checkable
    {...props}
  />
);

export const normal = () => <Story />;