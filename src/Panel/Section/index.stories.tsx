import * as React from 'react';

import { Typography } from '@material-ui/core';

import SectionPanel from '.';

export default { title: 'Panel/Section' };

interface Props {
  sections;
  secondaryPanel?;
  loading?;
}

const PanelWithHeader = ({
  sections,
  secondaryPanel = undefined,
  loading = false,
}: Props): JSX.Element => (
  <div
    style={{ height: '100vh', display: 'flex', flexDirection: 'row-reverse' }}
  >
    <SectionPanel
      header={<Typography>Header</Typography>}
      sections={sections}
      loading={loading}
      secondaryPanel={secondaryPanel}
      onClose={() => undefined}
    />
  </div>
);

const sections = [
  {
    expandable: true,
    id: 'first section',
    title: 'First section',
    section: <Typography>First section</Typography>,
  },
  {
    expandable: true,
    id: 'second section',
    title: 'Second section',
    section: <Typography>Second section</Typography>,
  },
  {
    expandable: true,
    id: 'third section',
    title: 'Third section',
    section: <Typography>Third section</Typography>,
  },
];

const moreSections = [
  {
    expandable: true,
    id: 'fourth section',
    title: 'Fourth section',
    section: <Typography>Fourth section</Typography>,
  },
  {
    expandable: true,
    id: 'fifth section',
    title: 'Fifth section',
    section: <Typography>Fifth section</Typography>,
  },
  {
    expandable: true,
    id: 'sixth section',
    title: 'Sixth section',
    section: <Typography>Sixth section</Typography>,
  },
  {
    expandable: true,
    id: 'seventh section',
    title: 'Seventh section',
    section: <Typography>Seventh section</Typography>,
  },
  {
    expandable: true,
    id: 'eighth section',
    title: 'Eighth section',
    section: <Typography>Eighth section</Typography>,
  },
  {
    expandable: true,
    id: 'nineth section',
    title: 'Nineth section',
    section: <Typography>Nineth section</Typography>,
  },
];

export const normal = (): JSX.Element => (
  <PanelWithHeader sections={sections} />
);

export const withMoreSections = (): JSX.Element => (
  <PanelWithHeader sections={sections.concat(moreSections)} />
);

export const withLoading = (): JSX.Element => (
  <PanelWithHeader loading sections={[]} />
);

export const withSecondaryPanel = (): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  return (
    <>
      <button onClick={() => setOpen((v) => !v)}>Open</button>
      <button onClick={() => setOpen2((v) => !v)}>Open 2</button>
      <PanelWithHeader
        sections={sections}
        secondaryPanel={
          open ? <Typography variant="h6">Secondary Panel</Typography> : null
        }
      />
    </>
  );
};
