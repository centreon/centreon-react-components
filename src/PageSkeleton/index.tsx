import * as React from 'react';

import { makeStyles, useTheme } from '@material-ui/core';
import { Skeleton} from '@material-ui/lab';
import clsx from 'clsx';
import BaseRectSkeleton from './BaseSkeleton';
import ContentSkeleton from './ContentSkeleton';

const headerHeight = 6.5;
const footerHeight = 3.8;

const useStyles = makeStyles((theme) => ({
  skeletonContainer: {
    width: '100%',
    height: '100%',
  },
  menuContentContainer: {
    display: 'grid',
    gridTemplateColumns: `${theme.spacing(5.5)}px 1fr`,
    height: '100%',
  },
  breadcrumbSkeleton: {
    margin: theme.spacing(0.5, 2),
    width: theme.spacing(30)
  },
  headerContentFooterContainer: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: `auto ${theme.spacing(footerHeight)}`,
    alignContent: 'space-between',
  }
}));

interface Props {
  displayHeaderAndNavigation?: boolean;
}

const PageSkeleton = ({ displayHeaderAndNavigation = false }: Props): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.skeletonContainer}>
      <div className={clsx({ [classes.menuContentContainer]: displayHeaderAndNavigation })}>
        <BaseRectSkeleton height='100%' />
        <div className={classes.headerContentFooterContainer}>
          <div>
            {displayHeaderAndNavigation && <BaseRectSkeleton height={theme.spacing(headerHeight)} />}
            <Skeleton variant="text" className={classes.breadcrumbSkeleton} animation="wave" />
            <ContentSkeleton />
          </div>
          {displayHeaderAndNavigation && <BaseRectSkeleton height={theme.spacing(footerHeight)} />}
        </div>
      </div>
    </div>
  )
}

export default PageSkeleton;