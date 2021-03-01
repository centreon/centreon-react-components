import * as React from 'react';

import { isNil, omit } from 'ramda';

import { fade, makeStyles, TableCell, TableCellProps } from '@material-ui/core';

import { Props as DataCellProps } from './DataCell';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: ({ compact }: Props) =>
      theme.spacing(0, 0, 0, compact ? 0.5 : 1.5),
    backgroundColor: ({ isRowHovered, row, rowColorConditions }: Props) => {
      if (isRowHovered) {
        return fade(theme.palette.primary.main, 0.08);
      }

      const foundCondition = rowColorConditions?.find(({ condition }) =>
        condition(row),
      );

      if (!isNil(foundCondition)) {
        return foundCondition.color;
      }

      return 'unset';
    },
  },
}));

type Props = Pick<
  DataCellProps,
  'isRowHovered' | 'row' | 'rowColorConditions' | 'compact'
> &
  TableCellProps;

const Cell = (props: Props): JSX.Element => {
  const classes = useStyles(props);

  const { children } = props;

  return (
    <TableCell
      classes={{ root: classes.root }}
      {...omit(['isRowHovered', 'row', 'rowColorConditions'], props)}
      component="div"
    >
      {children}
    </TableCell>
  );
};

export default Cell;
