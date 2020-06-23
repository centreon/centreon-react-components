import * as React from 'react';

import { equals } from 'ramda';

import { makeStyles, Slide, Paper } from '@material-ui/core';

const useStyles = makeStyles({
  rightPanel: {
    gridArea: '1 / 2',
    zIndex: 3,
    overflowY: 'auto',
  },
  paperPanel: {
    display: 'grid',
    gridTemplate: 'auto 1fr',
    height: '100%',
  },
  slideContent: {
    overflowY: 'auto',
  },
  slideHeader: {
    zIndex: 1,
  },
});

interface SlidePanelProps {
  open: boolean;
  slidePanel?: React.ReactElement;
  slideHeader?: React.ReactElement;
}

const SlidePanel = ({
  open,
  slidePanel,
  slideHeader,
}: SlidePanelProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Slide
      direction="left"
      in={equals(open, true)}
      timeout={{
        enter: 150,
        exit: 50,
      }}
    >
      <div className={classes.rightPanel}>
        <Paper elevation={5} className={classes.paperPanel}>
          {slideHeader && (
            <Paper elevation={3} className={classes.slideHeader}>
              {slideHeader}
            </Paper>
          )}
          <div className={classes.slideContent}>{slidePanel}</div>
        </Paper>
      </div>
    </Slide>
  );
};

export default SlidePanel;
