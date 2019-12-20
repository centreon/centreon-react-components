/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  IconAccessTime,
  IconAction,
  IconClose,
  IconCloseNew,
  IconContent,
  IconDone,
  IconInfo,
  IconToggleSubmenu,
  IconLibraryAdd,
  IconDelete,
  IconAttach,
  IconEdit,
  IconInsertChart,
  IconPowerSettings,
  IconPowerSettingsDisable,
  IconRefresh,
  IconReportProblem,
  IconVisible,
  IconInvisible,
  IconError,
} from '../src';

storiesOf('Icon', module).add(
  'Icon - action',
  () => {
    return (
      <React.Fragment>
        <IconAction iconActionType="update" />
        <IconAction iconActionType="clock" />
        <IconAction iconActionType="check" />
        <IconAction iconActionType="warning" />
        <IconAction iconActionType="arrow-right" />
      </React.Fragment>
    );
  },
  { notes: 'A very simple component' },
);

storiesOf('Icon', module).add(
  'Icon - close small',
  () => <IconClose iconType="small" />,
  { notes: 'A very simple component' },
);

storiesOf('Icon', module).add(
  'Icon - close middle',
  () => <IconClose iconType="middle" />,
  { notes: 'A very simple component' },
);

storiesOf('Icon', module).add(
  'Icon - close big',
  () => <IconClose iconType="big" />,
  { notes: 'A very simple component' },
);

storiesOf('Icon', module).add(
  'Icon - content',
  () => <IconContent iconContentType="add" iconContentColor="green" />,
  { notes: 'A very simple component' },
);

storiesOf('Icon', module).add(
  'Icon - info',
  () => {
    return (
      <React.Fragment>
        <IconInfo iconName="state" />
        <IconInfo iconName="question" />
      </React.Fragment>
    );
  },
  { notes: 'A very simple component' },
);

storiesOf('Icon', module).add(
  'Icon - info with text',
  () => {
    return (
      <React.Fragment>
        <IconInfo iconName="question" iconText="Test" />
      </React.Fragment>
    );
  },
  { notes: 'A very simple component' },
);

storiesOf('Icon', module).add(
  'Icon - toggle',
  () => {
    return (
      <div
        style={{
          backgroundColor: '#232f39',
          padding: '10px',
        }}
      >
        <IconToggleSubmenu iconType="arrow" />
      </div>
    );
  },
  { notes: 'A very simple component' },
);

storiesOf('Icon', module).add('Icon - Material', () => {
  return (
    <>
      <IconDelete />
      <IconEdit />
      <IconCloseNew />
      <IconLibraryAdd />
      <IconPowerSettings />
      <IconPowerSettingsDisable />
      <IconAttach />
      <IconInsertChart />
      <IconVisible />
      <IconInvisible />
      <IconRefresh />
      <IconAccessTime />
      <IconDone />
      <IconReportProblem />
      <IconError />
    </>
  );
});
