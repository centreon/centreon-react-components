import * as React from 'react';

import { Skeleton, SkeletonProps } from '@material-ui/lab';

import { PageSkeletonProps } from '.';

const BaseRectSkeleton = ({
  animate,
  ...props
}: Pick<PageSkeletonProps, 'animate'> & SkeletonProps): JSX.Element => (
  <Skeleton
    variant="rect"
    width="100%"
    animation={animate ? 'wave' : false}
    {...props}
  />
);

export default BaseRectSkeleton;
