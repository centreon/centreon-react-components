import * as React from 'react';

import { makeStyles, Paper, Slide, Divider } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    height: '100%',
    display: 'grid',
    gridTemplate: 'auto auto 1fr / 1fr',
  },
  header: {
    gridArea: '1 / 1 / 2 / 1',
    padding: 8,
  },
  divider: {
    gridArea: '2 / 1 / 3 / 1',
  },
  body: {
    gridArea: '3 / 1 / 4 / 1',
  },
});

interface SlidePanelProps {
  header: React.ReactElement;
  content: React.ReactElement;
}

const SlidePanel = ({ header, content }: SlidePanelProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Slide
      direction="left"
      in
      timeout={{
        enter: 150,
        exit: 50,
      }}
    >
      <Paper elevation={2} className={classes.container}>
        {header && (
          <>
            <div className={classes.header}>{header}</div>
            <Divider className={classes.divider} />
          </>
        )}
        <div className={classes.body}>{content}</div>
      </Paper>
    </Slide>
  );
};

export default SlidePanel;
