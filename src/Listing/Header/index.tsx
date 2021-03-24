import * as React from 'react';

import { equals, indexOf, move, path, prop } from 'ramda';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';

import {
  TableHead,
  TableRow,
  TableCell,
  withStyles,
  makeStyles,
} from '@material-ui/core';

import Checkbox from '../Checkbox';
import { Props as ListingProps } from '..';

import SortableHeaderItem from './SortableHeaderItem';

const height = 28;

const HeaderCell = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(0, 0, 0, 1.5),
    height,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'contents',
  },
  compactCell: {
    paddingLeft: theme.spacing(0.5),
  },
  headerLabelDragging: {
    cursor: 'grabbing',
  },
}));

type Props = Pick<
  ListingProps<unknown>,
  | 'sortField'
  | 'sortOrder'
  | 'onSort'
  | 'columns'
  | 'checkable'
  | 'onColumnSort'
  | 'columnConfiguration'
  | 'totalRows'
> & {
  onSelectAllClick: (event) => void;
  selectedRowCount: number;
  rowCount: number;
};

const ListingHeader = ({
  onSelectAllClick,
  sortOrder,
  sortField,
  selectedRowCount,
  rowCount,
  columns,
  columnConfiguration,
  onSort,
  onColumnSort,
  checkable,
}: Props): JSX.Element => {
  const classes = useStyles();

  const sensors = useSensors(useSensor(PointerSensor));

  const [draggedColumnId, setDraggedColumnId] = React.useState<string>();

  const columnIds = columns.map(prop('id'));

  const startDrag = (event) => {
    setDraggedColumnId(path<string>(['active', 'id'], event));
  };

  const cancelDrag = () => {
    setDraggedColumnId(undefined);
  };

  const endDrag = ({ over }) => {
    const { id } = over;

    const oldIndex = indexOf(draggedColumnId, columnIds);
    const newIndex = indexOf(id, columnIds);

    onColumnSort?.(move(oldIndex, newIndex, columns));
    setDraggedColumnId(undefined);
  };

  return (
    <TableHead className={classes.row} component="div">
      <TableRow className={classes.row} component="div">
        <DndContext
          sensors={sensors}
          onDragStart={startDrag}
          onDragCancel={cancelDrag}
          onDragEnd={endDrag}
        >
          <SortableContext
            items={columnIds}
            strategy={horizontalListSortingStrategy}
          >
            {checkable && (
              <HeaderCell component="div">
                <Checkbox
                  inputProps={{ 'aria-label': 'Select all' }}
                  indeterminate={
                    selectedRowCount > 0 && selectedRowCount < rowCount
                  }
                  checked={selectedRowCount === rowCount}
                  onChange={onSelectAllClick}
                />
              </HeaderCell>
            )}
            {columns.map((column) => (
              <SortableHeaderItem
                key={column.id}
                columnConfiguration={columnConfiguration}
                column={column}
                onSort={onSort}
                sortOrder={sortOrder}
                sortField={sortField}
              />
            ))}
          </SortableContext>
        </DndContext>
      </TableRow>
    </TableHead>
  );
};

const MemoizedListingHeader = React.memo(
  ListingHeader,
  (prevProps, nextProps) =>
    equals(prevProps.sortField, nextProps.sortField) &&
    equals(prevProps.sortOrder, nextProps.sortOrder) &&
    equals(prevProps.selectedRowCount, nextProps.selectedRowCount) &&
    equals(prevProps.rowCount, nextProps.rowCount) &&
    equals(prevProps.columns, nextProps.columns) &&
    equals(prevProps.checkable, nextProps.checkable) &&
    equals(prevProps.columnConfiguration, nextProps.columnConfiguration),
);

export default MemoizedListingHeader;
export { height as headerHeight, HeaderCell };
