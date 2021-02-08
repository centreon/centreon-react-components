import * as React from 'react';

import { isNil } from 'ramda';

import {
  withStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import useDeepCompare, { toList } from '../utils/useDeepCompare';

const ExpansionPanelSummary = withStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 3, 0, 2),
    minHeight: 'auto',
    '&$expanded': {
      minHeight: 'auto',
    },
    '&$focused': {
      backgroundColor: 'unset',
    },
    justifyContent: 'flex-start',
  },
  content: {
    margin: theme.spacing(1, 0),
    '&$expanded': {
      margin: theme.spacing(1, 0),
    },
    flexGrow: 0,
  },
  focused: {},
  expanded: {},
}))(AccordionSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 0.5, 1, 2),
  },
}))(AccordionDetails);

export interface FiltersProps {
  expandLabel?: string;
  expanded?: boolean;
  onExpand?: () => void;
  filters: React.ReactElement;
  expandableFilters?: React.ReactElement;
}

const FiltersContent = React.forwardRef(
  (
    {
      expandLabel,
      expanded = false,
      onExpand,
      filters,
      expandableFilters,
    }: FiltersProps,
    ref,
  ): JSX.Element => {
    const expandable = !isNil(onExpand);

    return (
      <Accordion square expanded={expandable ? expanded : false}>
        <ExpansionPanelSummary
          expandIcon={
            expandable && (
              <ExpandMoreIcon color="primary" aria-label={expandLabel} />
            )
          }
          IconButtonProps={{ onClick: onExpand }}
          style={{ cursor: 'default' }}
          ref={ref as React.RefObject<HTMLDivElement>}
        >
          {filters}
        </ExpansionPanelSummary>
        {expandableFilters && (
          <ExpansionPanelDetails>{expandableFilters}</ExpansionPanelDetails>
        )}
      </Accordion>
    );
  },
);

const Filters = ({
  expandLabel,
  expanded,
  onExpand,
  filters,
  expandableFilters,
  ...props
}: FiltersProps & Record<string, unknown>): JSX.Element => {
  return React.useMemo(
    () => (
      <FiltersContent
        expandLabel={expandLabel}
        expanded={expanded}
        onExpand={onExpand}
        filters={filters}
        expandableFilters={expandableFilters}
      />
    ),
    useDeepCompare(toList({ ...props, expanded })),
  );
};

export default Filters;
