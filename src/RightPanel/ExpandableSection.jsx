import React from 'react';

import PropTypes from 'prop-types';

import {
  Typography,
  makeStyles,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  styled,
  withStyles,
  ListItem,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  details: {
    padding: theme.spacing(0, 2),
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(15),
  fontWeight: 700,
}));

const Section = styled(Accordion)({
  width: '100%',
  margin: '0',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  borderBottom: '1px solid #bcbdc0',
  borderRadius: '0',
});

const CustomizedAccordionSummary = withStyles((theme) => ({
  root: {
    minHeight: theme.spacing(4),
    '&$expanded': {
      minHeight: theme.spacing(4),
    },
  },
  content: {
    '&$expanded': {
      margin: theme.spacing(1, 0),
    },
  },
  expanded: {},
}))(AccordionSummary);

const ExpandableSection = ({ title, children }) => {
  const classes = useStyles();
  return (
    <Section>
      <CustomizedAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Title>{title}</Title>
      </CustomizedAccordionSummary>
      <AccordionDetails className={classes.details}>
        <ListItem>{children}</ListItem>
      </AccordionDetails>
    </Section>
  );
};

ExpandableSection.defaultProps = {
  title: '',
};

ExpandableSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ExpandableSection;
