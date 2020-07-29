import * as React from 'react';

import { makeStyles, Theme } from '@material-ui/core';

const useStyles = (
  slidePanelIntegrated: boolean,
): (() => Record<string, string>) =>
  makeStyles<Theme>((theme) => ({
    page: {
      height: '100%',

      display: 'grid',
      gridTemplateRows: 'auto 1fr',
      backgroundColor: theme.palette.background.default,
      overflowY: 'hidden',
    },
    filters: {
      zIndex: 4,
    },
    body: {
      display: 'grid',
      gridTemplateRows: '1fr',
      gridTemplateColumns: '1fr 550px',
    },
    panel: {
      gridArea: '1 / 2',
      zIndex: 3,
    },
    listing: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      gridArea: slidePanelIntegrated ? '1 / 1 / 1 / 1' : '1 / 1 / 1 / span 2',
      height: '100%',
    },
  }));

interface Props {
  filters: React.ReactElement;
  listing: React.ReactElement;
  slidePanel?: React.ReactElement;
  slidePanelOpen: boolean;
  slidePanelIntegrate?: boolean;
}

const ListingPage = ({
  listing,
  filters,
  slidePanel,
  slidePanelOpen,
  slidePanelIntegrate = false,
}: Props): JSX.Element => {
  const classes = useStyles(slidePanelIntegrate && slidePanelOpen)();

  return (
    <div className={classes.page}>
      <div className={classes.filters}>{filters}</div>

      <div className={classes.body}>
        {slidePanelOpen && <div className={classes.panel}>{slidePanel}</div>}
        <div className={classes.listing}>{listing}</div>
      </div>
    </div>
  );
};

export default ListingPage;
