import * as React from 'react';

import PageSkeleton from '.';

export default { title: 'Page Skeleton' };

export const normal = (): JSX.Element => (
  <PageSkeleton />
);

export const normalWidthHeaderAndNavigation = (): JSX.Element => (
  <PageSkeleton displayHeaderAndNavigation />
);
