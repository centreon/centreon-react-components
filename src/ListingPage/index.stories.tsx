import * as React from 'react';

import { Typography, makeStyles, Paper } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

import ListingPage from '.';
import Listing from '../Listing';
import { ColumnType } from '../Listing/models';
import { SearchField } from '..';
import TextField from '../InputField/Text';
import AutocompleteField from '../InputField/Select/Autocomplete';
import SlidePanel from './SlidePanel';

export default { title: 'Listing Page' };

const noOp = (): void => undefined;

const useStyles = makeStyles((theme) => ({
  filtersSummary: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridGap: theme.spacing(2),
    alignItems: 'center',
  },
  autoComplete: {
    width: 250,
  },
  detailsPanel: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '94%',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    gridGap: theme.spacing(4),
  },
  detailsContent: {
    display: 'grid',
    gridTemplateAreas: `
      'title title'
      'description comment'
    `,
    gridTemplateRows: '50px 100px',
    gridGap: theme.spacing(2),
  },
  title: {
    gridArea: 'title',
    alignItems: 'center',
    textAlign: 'center',
  },
  description: {
    gridArea: 'description',
  },
  comment: {
    gridArea: 'comment',
  },
}));

const configuration = [
  {
    id: 'name',
    label: 'Name',
    type: ColumnType.string,
    getFormattedString: ({ name }): string => name,
  },
  {
    id: 'description',
    label: 'Description',
    type: ColumnType.string,
    getFormattedString: ({ description }): string => description,
  },
  {
    id: 'alias',
    label: 'Alias',
    type: ColumnType.string,
    getFormattedString: ({ alias }): string => alias,
  },
];

const fifteenElements = new Array(25).fill(0);

const elements = [...fifteenElements].map((_, index) => ({
  id: index,
  name: `E${index}`,
  description: `Entity ${index}`,
  alias: `Alias ${index}`,
  active: index % 2 === 0,
}));

const rowColorConditions = [
  {
    name: 'inactive',
    condition: ({ active }): boolean => !active,
    color: grey[500],
  },
];

const options = [
  { id: 0, name: 'First Entity' },
  { id: 1, name: 'Second Entity' },
  { id: 2, name: 'Third Entity' },
];

const listing = (
  <Listing
    columnConfiguration={configuration}
    onSort={noOp}
    onPaginate={noOp}
    onPaginationLimitChanged={noOp}
    limit={elements.length}
    currentPage={0}
    totalRows={elements.length}
    tableData={elements}
    rowColorConditions={rowColorConditions}
  />
);

const FiltersSummary = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.filtersSummary}>
      <Typography>Filters</Typography>
      <SearchField />
    </div>
  );
};

const FiltersDetails = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.filtersSummary}>
      <TextField placeholder="Text" />
      <AutocompleteField
        className={classes.autoComplete}
        options={options}
        label="Autocomplete"
        placeholder="Type here..."
        value={options[0]}
      />
      <AutocompleteField
        className={classes.autoComplete}
        options={options}
        label="Other Autocomplete"
        placeholder="Type here..."
        value={options[1]}
      />
      <TextField placeholder="Other Text" />
    </div>
  );
};

const DetailsPanelContent = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.detailsPanel}>
      <div className={classes.detailsContent}>
        <Paper className={classes.title}>
          <Typography>My Title</Typography>
        </Paper>
        <Paper className={classes.description}>
          <Typography>Description</Typography>
        </Paper>
        <Paper className={classes.comment}>
          <Typography>Comment</Typography>
        </Paper>
      </div>
      <div className={classes.detailsContent}>
        <Paper className={classes.title}>
          <Typography>My Title</Typography>
        </Paper>
        <Paper className={classes.description}>
          <Typography>Description</Typography>
        </Paper>
        <Paper className={classes.comment}>
          <Typography>Comment</Typography>
        </Paper>
      </div>
      <div className={classes.detailsContent}>
        <Paper className={classes.title}>
          <Typography>My Title</Typography>
        </Paper>
        <Paper className={classes.description}>
          <Typography>Description</Typography>
        </Paper>
        <Paper className={classes.comment}>
          <Typography>Comment</Typography>
        </Paper>
      </div>
      <div className={classes.detailsContent}>
        <Paper className={classes.title}>
          <Typography>My Title</Typography>
        </Paper>
        <Paper className={classes.description}>
          <Typography>Description</Typography>
        </Paper>
        <Paper className={classes.comment}>
          <Typography>Comment</Typography>
        </Paper>
      </div>
      <div className={classes.detailsContent}>
        <Paper className={classes.title}>
          <Typography>My Title</Typography>
        </Paper>
        <Paper className={classes.description}>
          <Typography>Description</Typography>
        </Paper>
        <Paper className={classes.comment}>
          <Typography>Comment</Typography>
        </Paper>
      </div>
    </div>
  );
};

const DetailsPanelHeader = (): JSX.Element => (
  <Typography variant="h5" align="center">
    Details Panel
  </Typography>
);

const DetailsPanel = (): JSX.Element => (
  <SlidePanel
    header={<DetailsPanelHeader />}
    content={<DetailsPanelContent />}
  />
);

export const normal = (): JSX.Element => (
  <ListingPage
    slidePanelOpen={false}
    listing={listing}
    filtersExpandable={false}
    filters={<FiltersSummary />}
  />
);

export const normalWithOpenedPanel = (): JSX.Element => (
  <ListingPage
    slidePanelOpen
    listing={listing}
    filtersExpandable={false}
    filters={<FiltersSummary />}
    slidePanel={<DetailsPanel />}
  />
);

export const normalWithFiltersDetails = (): JSX.Element => (
  <ListingPage
    slidePanelOpen={false}
    listing={listing}
    filtersExpandable
    filters={<FiltersSummary />}
    expandableFilters={<FiltersDetails />}
  />
);

export const normalWithFiltersDetailsAndOpenedPanel = (): JSX.Element => (
  <ListingPage
    slidePanelOpen
    listing={listing}
    filtersExpandable
    filters={<FiltersSummary />}
    expandableFilters={<FiltersDetails />}
    slidePanel={<DetailsPanel />}
  />
);
