import * as React from 'react';

import { useFormikContext } from 'formik';
import { equals } from 'ramda';

import { DialogContent, makeStyles } from '@material-ui/core';

import { WizardContentProps } from './models';
import ActionsBar from './ActionsBar';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    backgroundColor: theme.palette.grey[100],
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
}));

const WizardContent = ({
  sendingRequest,
  step,
  isLastStep,
  isFirstStep,
  disableNextOnSendingRequests,
  goToPreviousStep,
  currentStep,
  actionsBarLabels,
  goToNextStep,
}: WizardContentProps): JSX.Element => {
  const classes = useStyles();
  const {
    isSubmitting,
    isValid,
    dirty,
    handleSubmit,
    validateForm,
  } = useFormikContext();

  const { Component, noActionsBar, skipFormChangeCheck } = step;

  const getFormChanged = () =>
    equals(true, skipFormChangeCheck) ? false : !dirty;

  const submit = (): void => {
    handleSubmit();
  };

  React.useEffect(() => {
    validateForm();
  }, [currentStep]);

  const disableActionButtons =
    sendingRequest || isSubmitting || !isValid || getFormChanged();

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <DialogContent className={classes.dialogContent}>
        <Component
          disableNextOnSendingRequests={disableNextOnSendingRequests}
        />
      </DialogContent>
      {!noActionsBar && (
        <ActionsBar
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          goToPreviousStep={goToPreviousStep}
          submit={submit}
          disableActionButtons={disableActionButtons}
          isSubmitting={isSubmitting}
          actionsBarLabels={actionsBarLabels}
          goToNextStep={goToNextStep}
        />
      )}
    </form>
  );
};

export default WizardContent;
