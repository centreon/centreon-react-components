import * as React from 'react';

import {
  equals,
  indexOf,
  isNil,
  move,
  not,
  path,
  pipe,
  prop,
  propEq,
} from 'ramda';
import clsx from 'clsx';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';

import {
  TableHead,
  TableRow,
  TableCell,
  withStyles,
  makeStyles,
} from '@material-ui/core';

import { useStyles as useCellStyles } from '../Cell/DataCell';
import Checkbox from '../Checkbox';

import HeaderLabel from './Label';
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

interface Props {
  onSelectAllClick: (event) => void;
  order?: 'desc' | 'asc';
  orderBy?: string;
  numSelected: number;
  rowCount: number;
  headColumns;
  checkable: boolean;
  onRequestSort: (event, property) => void;
}

const ListingHeader = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  headColumns,
  checkable,
  onRequestSort,
}: Props): JSX.Element => {
  const classes = useStyles();
  const cellClasses = useCellStyles({ listingCheckable: checkable });

  const sensors = useSensors(useSensor(PointerSensor));

  const [activeId, setActiveId] = React.useState<string>();

  const ids = headColumns.map(prop('id'));

  // const sortableItems = React.useMemo(
  //   () => map(pipe(Rprops(['label', 'id']), join('_')), headColumns),
  //   [headColumns],
  // );

  const dragStart = (event) => {
    setActiveId(path<string>(['active', 'id'], event));
  };

  const dragCancel = () => {
    setActiveId(undefined);
  };

  const dragEnd = () => {
    setActiveId(undefined);
  };

  const dragOver = (event): void => {
    const overId = path<string>(['over', 'id'], event);

    if (pipe(isNil, not)(overId) && pipe(equals(activeId), not)(overId)) {
      const oldIndex = indexOf(activeId, ids);
      const newIndex = indexOf(overId, ids);

      console.log(move(oldIndex, newIndex, headColumns));
    }
  };

  return (
    <TableHead className={classes.row} component="div">
      <TableRow className={classes.row} component="div">
        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          onDragOver={dragOver}
          onDragStart={dragStart}
          onDragCancel={dragCancel}
          onDragEnd={dragEnd}
        >
          <SortableContext items={ids}>
            {checkable && (
              <HeaderCell component="div">
                <Checkbox
                  inputProps={{ 'aria-label': 'Select all' }}
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={numSelected === rowCount}
                  onChange={onSelectAllClick}
                />
              </HeaderCell>
            )}
            {headColumns.map((column) => (
              <HeaderCell
                key={column.id}
                align={column.numeric ? 'left' : 'inherit'}
                padding={column.compact ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
                component="div"
                className={clsx(
                  cellClasses.cell,
                  column.compact && classes.compactCell,
                )}
              >
                <SortableHeaderItem
                  column={column}
                  onSort={onRequestSort}
                  order={order}
                  orderBy={orderBy}
                />
              </HeaderCell>
            ))}
          </SortableContext>
          <DragOverlay>
            {activeId && (
              <HeaderLabel className={classes.headerLabelDragging}>
                {headColumns.find(propEq('id', activeId)).label}
              </HeaderLabel>
            )}
          </DragOverlay>
        </DndContext>
      </TableRow>
    </TableHead>
  );
};

const MemoizedListingHeader = React.memo(
  ListingHeader,
  (prevProps, nextProps) =>
    equals(prevProps.order, nextProps.order) &&
    equals(prevProps.orderBy, nextProps.orderBy) &&
    equals(prevProps.numSelected, nextProps.numSelected) &&
    equals(prevProps.rowCount, nextProps.rowCount) &&
    equals(prevProps.headColumns, nextProps.headColumns) &&
    equals(prevProps.checkable, nextProps.checkable),
);

export default MemoizedListingHeader;
export { height as headerHeight };
