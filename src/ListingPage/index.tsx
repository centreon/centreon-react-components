import * as React from 'react';

import { isNil, prop, pipe } from 'ramda';

import { makeStyles, Theme } from '@material-ui/core';

import useResizeObserver from '../utils/useResizeObserver';
import getCumulativeOffset from '../utils/getCumulativeOffset';

const useStyles = (
  slidePanelIntegrated: boolean,
): (() => Record<string, string>) =>
  makeStyles<Theme>((theme) => ({
    page: {
      // display: 'grid',
      // gridTemplateRows: 'auto 1fr',
      // backgroundColor: theme.palette.background.default,
      // overflowY: 'hidden',
      // height: '100%',

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
    listing: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      gridArea: slidePanelIntegrated ? '1 / 1 / 1 / 1' : '1 / 1 / 1 / span 2',
      height: '100%',
    },
  }));

type DivRefObject = React.RefObject<HTMLDivElement>;

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
  const bodyRef = React.useRef<HTMLDivElement>() as DivRefObject;
  const filterRef = React.useRef<HTMLDivElement>() as DivRefObject;
  const [height, setHeight] = React.useState<string>('100%');

  useResizeObserver<HTMLDivElement>({
    ref: filterRef,
    onResize: () => {
      setHeight(pageBodyHeight());
    },
  });

  React.useEffect(() => {
    setHeight(pageBodyHeight());
  }, [bodyRef.current]);

  const pageBodyHeight = (): string => {
    if (isNil(bodyRef.current)) {
      return '100%';
    }

    const element = bodyRef.current as HTMLElement;

    return `calc(100vh - ${getCumulativeOffset(element)}px - ${Math.floor(
      (filterRef.current?.clientHeight || 0) / 2,
    )}px)`;
  };

  return (
    <div className={classes.page}>
      <div ref={filterRef} className={classes.filters}>
        {filters}
      </div>

      <div
        className={classes.body}
        ref={bodyRef}
        style={{
          height,
        }}
      >
        {slidePanelOpen && slidePanel}
        <div className={classes.listing}>{listing}</div>
      </div>
    </div>
  );
};

export default ListingPage;
