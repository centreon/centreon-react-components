import React from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import MaterialStepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import StepIcon from './StepIcon';

const useStyles = makeStyles((theme) => ({
  label: {
    '& .MuiStepLabel-alternativeLabel': {
      fontSize: '0.8rem',
      marginTop: '4px',
    },
  },
  stepper: {
    backgroundColor: theme.palette.grey[200],
    padding: '18px 16px 14px 16px',
  },
}));

const Stepper = ({ activeStep, children }) => {
  const classes = useStyles();

  return (
    <MaterialStepper
      alternativeLabel
      activeStep={activeStep}
      className={classes.stepper}
    >
      {React.Children.toArray(children).map((child, index) => (
        <Step key={child.props.label || index}>
          <StepLabel
            StepIconComponent={StepIcon}
            classes={{
              alternativeLabel: classes.label,
            }}
          >
            {child.props.label ? child.props.label : null}
          </StepLabel>
        </Step>
      ))}
    </MaterialStepper>
  );
};

Stepper.propTypes = {
  activeStep: PropTypes.number,
  children: PropTypes.node.isRequired,
};

Stepper.defaultProps = {
  activeStep: null,
};

export default Stepper;
