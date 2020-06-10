import * as React from 'react';

import { makeStyles } from '@material-ui/core';
import Filters, { FiltersProps } from './Filters';
import SlidePanel, { SlidePanelProps } from './SlidePanel';

const useStyles = makeStyles((theme) => ({
  page: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    backgroundColor: theme.palette.background.default,
    overflowY: 'hidden',
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
  },
}));

interface Props {
  listing: React.ReactElement;
}

const ListingPage = ({
  openSlidePanel,
  listing,
  filtersExpandable,
  labelFiltersIcon,
  filters,
  expandableFilters,
  slidePanel,
}: Props & FiltersProps & SlidePanelProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <Filters
        filtersExpandable={filtersExpandable}
        labelFiltersIcon={labelFiltersIcon}
        filters={filters}
        expandableFilters={expandableFilters}
      />
      <div className={classes.pageBody}>
        {openSlidePanel && (
          <SlidePanel openSlidePanel={openSlidePanel} slidePanel={slidePanel} />
        )}
        <div className={classes.listing}>{listing}</div>
      </div>
    </div>
  );
};

export default ListingPage;
