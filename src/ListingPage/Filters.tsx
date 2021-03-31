import * as React from 'react';

import {
  withStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ExpansionPanelSummary = withStyles((theme) => ({
  content: {
    '&$expanded': {
      margin: theme.spacing(1, 0),
    },
    flexGrow: 0,
    margin: theme.spacing(1, 0),
  },
  expanded: {},
  focused: {},
  root: {
    '&$expanded': {
      minHeight: 'auto',
    },
    '&$focused': {
      backgroundColor: 'unset',
    },
    justifyContent: 'flex-start',
    minHeight: 'auto',
    padding: theme.spacing(0, 3, 0, 2),
  },
}))(AccordionSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 0.5, 1, 2),
  },
}))(AccordionDetails);

export interface FiltersProps {
  expandLabel?: string;
  expandable?: boolean;
  expandableFilters?: React.ReactElement;
  filters: React.ReactElement;
  onExpandTransitionFinish?: (expanded: boolean) => void;
}

const Filters = React.forwardRef(
  (
    {
      expandable = false,
      expandLabel,
      filters,
      expandableFilters,
      onExpandTransitionFinish,
    }: FiltersProps,
    ref,
  ): JSX.Element => {
    const [expanded, setExpanded] = React.useState(false);

    const toggleExpanded = () => setExpanded(!expanded);

    return (
      <Accordion
        square
        expanded={expandable ? expanded : false}
        onTransitionEnd={() => onExpandTransitionFinish?.(expanded)}
      >
        <ExpansionPanelSummary
          IconButtonProps={{ onClick: toggleExpanded }}
          expandIcon={
            expandable && (
              <ExpandMoreIcon aria-label={expandLabel} color="primary" />
            )
          }
          ref={ref as React.RefObject<HTMLDivElement>}
          style={{ cursor: 'default' }}
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

export default Filters;
