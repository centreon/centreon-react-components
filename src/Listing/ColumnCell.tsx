import * as React from 'react';

import { equals } from 'ramda';
import clsx from 'clsx';

import {
  makeStyles,
  withStyles,
  TableCell,
  Tooltip,
  Typography,
  Theme,
} from '@material-ui/core';

import { Column, ColumnType, ComponentColumnProps } from './models';

const BodyTableCell = withStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 0, 0, 1.5),
  },
}))(TableCell);

const useStyles = makeStyles<Theme, { listingCheckable: boolean }>((theme) => ({
  cell: {
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  truncated: {
    maxWidth: 150,
  },
}));

interface Props {
  row;
  column: Column;
  listingCheckable: boolean;
  isRowSelected: boolean;
  isRowHovered: boolean;
}

const ColumnCell = ({
  row,
  column,
  listingCheckable,
  isRowSelected,
  isRowHovered,
}: Props): JSX.Element | null => {
  const classes = useStyles({ listingCheckable });

  const cellByColumnType = {
    [ColumnType.string]: (): JSX.Element => {
      const { getFormattedString, getTruncateCondition, getColSpan } = column;

      const isTruncated = getTruncateCondition?.(isRowSelected);
      const colSpan = getColSpan?.(isRowSelected);

      const formattedString = getFormattedString?.(row) || '';

      const gridColumn = colSpan ? `auto / span ${colSpan}` : 'auto / auto';

      return (
        <BodyTableCell
          align="left"
          className={classes.cell}
          style={{ gridColumn }}
        >
          {isTruncated && (
            <Tooltip title={formattedString}>
              <Typography
                variant="body2"
                className={clsx({ [classes.truncated]: isTruncated })}
              >
                {formattedString}
              </Typography>
            </Tooltip>
          )}
          {!isTruncated && formattedString}
        </BodyTableCell>
      );
    },
    [ColumnType.component]: (): JSX.Element | null => {
      const { getHiddenCondition, clickable } = column;
      const Component = column.Component as (
        props: ComponentColumnProps,
      ) => JSX.Element;

      const isCellHidden = getHiddenCondition?.(isRowSelected);

      if (isCellHidden) {
        return null;
      }

      return (
        <BodyTableCell
          align="left"
          onClick={(e): void => {
            if (!clickable) {
              return;
            }
            e.preventDefault();
            e.stopPropagation();
          }}
          className={classes.cell}
        >
          <Component
            row={row}
            isSelected={isRowSelected}
            isHovered={isRowHovered}
          />
        </BodyTableCell>
      );
    },
  };

  return cellByColumnType[column.type]();
};

const MemoizedColumnCell = React.memo<Props>(
  ColumnCell,
  (prevProps, nextProps) => {
    const previousColumn = prevProps.column;
    const previousRow = prevProps.row;
    const previousIsRowHovered = prevProps.isRowHovered;
    const previousIsRowSelected = prevProps.isRowSelected;
    const previousHasHoverableComponent = previousColumn.hasHoverableComponent;
    const previousRenderComponentOnRowUpdate = previousColumn.getRenderComponentOnRowUpdateCondition?.(
      previousRow,
    );
    const previousRenderComponentCondition = previousColumn.getRenderComponentCondition?.(
      previousRow,
    );
    const previousIsComponentHovered =
      previousHasHoverableComponent && previousIsRowHovered;
    const previousFormattedString = previousColumn.getFormattedString?.(
      previousRow,
    );
    const previousTruncateCondition = previousColumn.getTruncateCondition?.(
      previousIsRowSelected,
    );
    const previousColSpan = previousColumn.getColSpan?.(previousIsRowSelected);
    const previousHiddenCondition = previousColumn.getHiddenCondition?.(
      previousIsRowSelected,
    );

    const nextColumn = nextProps.column;
    const nextRow = nextProps.row;
    const nextIsRowHovered = nextProps.isRowHovered;
    const nextIsRowSelected = nextProps.isRowSelected;
    const nextHasHoverableComponent = nextColumn.hasHoverableComponent;
    const nextRenderComponentOnRowUpdate = nextColumn.getRenderComponentOnRowUpdateCondition?.(
      nextRow,
    );
    const nextRenderComponentCondition = nextColumn.getRenderComponentCondition?.(
      nextRow,
    );
    const nextIsComponentHovered =
      nextHasHoverableComponent && nextIsRowHovered;

    const nextFormatttedString = nextColumn.getFormattedString?.(nextRow);

    const nextColSpan = nextColumn.getColSpan?.(nextIsRowSelected);

    const nextTruncateCondition = nextColumn.getTruncateCondition?.(
      nextIsRowSelected,
    );

    const nextHiddenCondition = nextColumn.getHiddenCondition?.(
      nextIsRowSelected,
    );

    if (previousRenderComponentCondition && nextRenderComponentCondition) {
      return false;
    }

    return (
      equals(previousIsComponentHovered, nextIsComponentHovered) &&
      equals(previousFormattedString, nextFormatttedString) &&
      equals(previousColSpan, nextColSpan) &&
      equals(previousTruncateCondition, nextTruncateCondition) &&
      equals(previousHiddenCondition, nextHiddenCondition) &&
      equals(previousHiddenCondition, nextHiddenCondition) &&
      equals(
        previousRenderComponentOnRowUpdate && previousRow,
        nextRenderComponentOnRowUpdate && nextRow,
      )
    );
  },
);

export default MemoizedColumnCell;
export { BodyTableCell, useStyles };
