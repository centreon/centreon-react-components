import * as React from 'react';

import { makeStyles } from '@material-ui/core';
import Filters, { FiltersProps } from './Filters';
import SlidePanel from './SlidePanel';

const useStyles = makeStyles((theme) => ({
  page: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    backgroundColor: theme.palette.background.default,
    overflowY: 'hidden',
    height: '100%',
  },
  pageBody: {
    display: 'grid',
    gridTemplateRows: '1fr',
    gridTemplateColumns: '1fr 550px',
  },
  listing: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    gridArea: '1 / 1 / 1 / span 2',
    height: '100%',
  },
}));

interface Props {
  listing: React.ReactElement;
  slidePanelOpen: boolean;
  slidePanel?: React.ReactElement;
}

const cumulativeOffset = (element): number => {
  if (!element || !element.offsetParent) {
    return 0;
  }

  return cumulativeOffset(element.offsetParent) + element.offsetTop;
};

const heightOffset = '30px';

const ListingPage = ({
  slidePanelOpen,
  listing,
  filtersExpandable,
  labelFiltersIcon,
  filters,
  expandableFilters,
  slidePanel,
}: Props & FiltersProps): JSX.Element => {
  const classes = useStyles();
  const pageBody = React.useRef<HTMLDivElement>();
  const [height, setHeight] = React.useState<string>('100%');

  React.useEffect(() => {
    setHeight(pageBodyHeight());
  }, [pageBody.current]);

  const pageBodyHeight = (): string => {
    return pageBody.current
      ? `calc(100vh - ${cumulativeOffset(
          pageBody.current,
        )}px - ${heightOffset})`
      : '100%';
  };

  return (
    <div className={classes.page}>
      <Filters
        filtersExpandable={filtersExpandable}
        labelFiltersIcon={labelFiltersIcon}
        filters={filters}
        expandableFilters={expandableFilters}
        onExpandTransitionFinished={() => {
          setHeight(pageBodyHeight());
        }}
      />
      <div
        className={classes.pageBody}
        ref={pageBody as React.RefObject<HTMLDivElement>}
        style={{
          height,
        }}
      >
        {slidePanelOpen && (
          <SlidePanel open={slidePanelOpen} slidePanel={slidePanel} />
        )}
        <div className={classes.listing}>{listing}</div>
      </div>
    </div>
  );
};

export default ListingPage;
