import React from 'react';
import { storiesOf } from '@storybook/react';
import { Breadcrumb } from '../src';

storiesOf('Breadcrumb', module).add('with three levels', () => (
  <Breadcrumb
    breadcrumbs={[
      {
        label: 'first level',
        link: '#',
      },
      {
        label: 'second level',
        link: '#',
      },
    ]}
  />
));
