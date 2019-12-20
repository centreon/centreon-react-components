/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { SearchLive } from '../src';

storiesOf('Search', module).add(
  'Search - live',
  () => <SearchLive label="name" />,
  { notes: 'A very simple component' },
);