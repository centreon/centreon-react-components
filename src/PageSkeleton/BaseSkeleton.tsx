import * as React from 'react';

import { Skeleton, SkeletonProps } from '@material-ui/lab';

const BaseRectSkeleton = (props: SkeletonProps): JSX.Element => (
  <Skeleton variant="rect" width="100%" animation="wave" {...props} />
);

export default BaseRectSkeleton;
