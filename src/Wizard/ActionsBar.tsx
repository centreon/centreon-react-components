import * as React from 'react';

import {
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

import { ActionsBarProps } from './models';

const useStyles = makeStyles((theme) => ({
  container: {
    bottom: 0,
    padding: theme.spacing(0, 2),
    backgroundColor: theme.palette.grey[100],
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
}));

const ActionsBar = ({
  isFirstStep,
  goToPreviousStep,
  goToNextStep,
  submit,
  disableActionButtons,
  isLastStep,
  isSubmitting,
  actionsBarLabels,
}: ActionsBarProps): JSX.Element => {
  const classes = useStyles();

  const preventEnterKey = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };

  const { labelFinish, labelNext, labelPrevious } = actionsBarLabels;

  const labelNextFinish = isLastStep() ? labelFinish : labelNext;

  return (
    <DialogActions className={classes.container}>
      {!isFirstStep() && (
        <Button
          color="primary"
          onClick={goToPreviousStep}
          onKeyPress={preventEnterKey}
          aria-label={labelPrevious}
        >
          <Typography>{labelPrevious}</Typography>
        </Button>
      )}
      <Button
        color="primary"
        onClick={() => (isLastStep() ? submit() : goToNextStep())}
        disabled={disableActionButtons}
        onKeyPress={preventEnterKey}
        aria-label={labelNextFinish}
      >
        <Typography>{labelNextFinish}</Typography>
        {isSubmitting && <CircularProgress size={20} />}
      </Button>
    </DialogActions>
  );
};

export default ActionsBar;
