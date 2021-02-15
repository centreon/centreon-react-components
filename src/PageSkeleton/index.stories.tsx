import * as React from 'react';

import MenuLoader from './MenuSkeleton';

import PageSkeleton from '.';

export default { title: 'Page Skeleton' };

export const normal = (): JSX.Element => <PageSkeleton animate={false} />;

export const normalWidthHeaderAndNavigation = (): JSX.Element => (
  <PageSkeleton displayHeaderAndNavigation animate={false} />
);

export const menuLoader = (): JSX.Element => (
  <div style={{ backgroundColor: '#444455' }}>
    <MenuLoader animate={false} />
  </div>
);

export const menuLoaderWithCustomWidth = (): JSX.Element => (
  <div style={{ backgroundColor: '#444455' }}>
    <MenuLoader width={40} animate={false} />
  </div>
);
