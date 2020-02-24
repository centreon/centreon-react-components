import React from 'react';

import { Skeleton } from '@material-ui/lab';

import ListingRow from './Row';

interface LoadingSkeletonProps {
  checkable?: boolean;
  columnConfiguration;
  BodyTableCell;
}

const ListingLoadingSkeleton = ({
  columnConfiguration,
  checkable,
  BodyTableCell,
}: LoadingSkeletonProps): JSX.Element => (
  <>
    {new Array(10).fill(0).map(() => (
      <ListingRow tabIndex={-1}>
        {checkable && (
          <BodyTableCell align="left">
            <Skeleton height={20} animation="wave" />
          </BodyTableCell>
        )}
        {columnConfiguration.map((column) => (
          <BodyTableCell key={column.id} align="left">
            <Skeleton height={20} animation="wave" />
          </BodyTableCell>
        ))}
      </ListingRow>
    ))}
  </>
);

export default ListingLoadingSkeleton;
