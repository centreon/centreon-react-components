import * as React from 'react';

import { useTheme, makeStyles } from '@material-ui/core';

import BaseRectSkeleton from './BaseSkeleton';

const numberOfActionButtons = 2;
const filterHeight = 6.5;
const paginationHeight = 5;
const actionBarHeight = 6;
const contentHeight = 40;

const useStyles = makeStyles((theme) => ({
  actionBarPaginationContainer: {
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(3),
    display: 'grid',
    gridTemplateColumns: `${theme.spacing(50)}px ${theme.spacing(54)}px`,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionBarSkeleton: {
    display: 'grid',
    gridTemplateColumns: `repeat(${numberOfActionButtons}, ${theme.spacing(
      10,
    )}px)`,
    columnGap: `${theme.spacing(1)}px`,
  },
  contentSkeleton: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
}));

const ContentSkeleton = (): JSX.Element => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <>
      <BaseRectSkeleton height={theme.spacing(filterHeight)} />
      <div className={classes.actionBarPaginationContainer}>
        <div className={classes.actionBarSkeleton}>
          {Array(numberOfActionButtons)
            .fill(null)
            .map((_, idx) => (
              <BaseRectSkeleton
                key={idx.toString()}
                height={theme.spacing(actionBarHeight)}
              />
            ))}
        </div>
        <BaseRectSkeleton height={theme.spacing(paginationHeight)} />
      </div>
      <div className={classes.contentSkeleton}>
        <BaseRectSkeleton height={theme.spacing(contentHeight)} />
      </div>
    </>
  );
};

export default ContentSkeleton;
