import * as React from 'react';

import { useTheme, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const headerHeight = 3.8;

const useStyles = makeStyles((theme) => ({
  nextContent: {
    marginTop: theme.spacing(1.5),
  },
}));

export const SliderSkeleton = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Skeleton
      variant="rect"
      width="100%"
      height={theme.spacing(50)}
      animation="wave"
    />
  );
};

export const HeaderSkeleton = (): JSX.Element => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <>
      <Skeleton
        variant="rect"
        height={theme.spacing(headerHeight)}
        width={theme.spacing(10)}
      />
      <Skeleton
        variant="rect"
        height={theme.spacing(headerHeight)}
        width={theme.spacing(20)}
        className={classes.nextContent}
      />
    </>
  );
};

export const ContentSkeleton = (): JSX.Element => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <>
      <Skeleton variant="text" width={theme.spacing(20)} />
      <Skeleton
        variant="text"
        width={theme.spacing(15)}
        className={classes.nextContent}
      />
      <Skeleton
        variant="text"
        width={theme.spacing(25)}
        className={classes.nextContent}
      />
    </>
  );
};

export const ReleaseNoteSkeleton = (): JSX.Element => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <>
      <Skeleton variant="text" width={theme.spacing(15)} />
      <Skeleton
        variant="text"
        width={theme.spacing(25)}
        className={classes.nextContent}
      />
    </>
  );
};
