/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-sequences */

import React from 'react';
import classnames from 'classnames';
import { storiesOf } from '@storybook/react';
import styles from '../src/global-sass-files/_helpers.scss';
import { Table, TableDynamic, Title, Button } from '../src';

storiesOf('Table', module).add('Table - custom', () => <Table />, {
  notes: 'A very simple component',
});
storiesOf('Table', module).add(
  'Table Dynamic - custom',
  () => (
    (
      <React.Fragment>
        <Title titleColor="host" label="Resource discovry wizard" />
        <TableDynamic />
        <div className={classnames(styles['text-right'], styles['mt-2'])}>
          <Button
            label="SAVE"
            buttonType="validate"
            color="blue"
            customClass="normal"
          />
          <div className={classnames(styles['f-r'], styles['ml-1'])}>
            <Button
              label="SAVE & MONITOR"
              buttonType="validate"
              color="blue"
              customClass="normal"
            />
          </div>
        </div>
      </React.Fragment>
    ),
    { notes: 'A very simple component' }
  ),
);

storiesOf('Table', module).add(
  'Table - with scroll',
  () => <Table tableScroll={true} />,
  { notes: 'A very simple component' },
);
