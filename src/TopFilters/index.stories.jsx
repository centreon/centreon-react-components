/* eslint-disable no-console */
import React from 'react';

import clsx from 'clsx';

import styles from '../global-sass-files/_grid.scss';

import TopFilters from '.';

export default { title: 'TopFilters' };

export const normal = () => (
  <TopFilters
    fullText={{
      label: 'Search:',
      onChange: (a) => {
        console.log(a);
      },
    }}
    switches={[
      [
        {
          customClass: clsx(
            styles['container__col-md-3'],
            styles['container__col-xs-4'],
          ),
          switchTitle: 'Status:',
          switchStatus: 'Not installed',
          defaultValue: false,
          onChange: (value) => {
            console.log(value);
          },
        },
        {
          customClass: clsx(
            styles['container__col-md-3'],
            styles['container__col-xs-4'],
          ),
          switchStatus: 'Installed',
          defaultValue: false,
          onChange: (value) => {
            console.log(value);
          },
        },
        {
          customClass: clsx(
            styles['container__col-md-3'],
            styles['container__col-xs-4'],
          ),
          switchStatus: 'Update',
          defaultValue: false,
          onChange: (value) => {
            console.log(value);
          },
        },
      ],
      [
        {
          customClass: clsx(
            styles['container__col-sm-3'],
            styles['container__col-xs-4'],
          ),
          switchTitle: 'Type:',
          switchStatus: 'Module',
          defaultValue: false,
          onChange: (value) => {
            console.log(value);
          },
        },
        {
          customClass: clsx(
            styles['container__col-sm-3'],
            styles['container__col-xs-4'],
          ),
          switchStatus: 'Update',
          defaultValue: false,
          onChange: (value) => {
            console.log(value);
          },
        },
        {
          button: true,
          label: 'Clear Filters',
          color: 'black',
          buttonType: 'bordered',
          onClick: () => {
            console.log('Clear filters clicked');
          },
        },
      ],
    ]}
  />
);
