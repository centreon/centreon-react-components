import * as React from 'react';

import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import { Wizard, WizardPage as Page } from '..';

export default { title: 'Wizard' };

export const oneStep = () => (
  <Wizard open>
    <Page>
      <Typography align="center" variant="h5">
        Step 1
      </Typography>
    </Page>
  </Wizard>
);

export const threeSteps = () => (
  <Wizard open>
    <Page label="step 1">
      <Typography align="center" variant="h5">
        Step 1
      </Typography>
    </Page>
    <Page label="step 2">
      <Typography align="center" variant="h5">
        Step 2
      </Typography>
    </Page>
    <Page label="step3">
      <Typography align="center" variant="h5">
        Step 3
      </Typography>
    </Page>
  </Wizard>
);

export const threeStepsWithCustomLabels = () => (
  <Wizard
    open
    actionBarProps={{
      labelFinish: 'Finish wizard',
      labelNext: 'Next step',
      labelPrevious: 'Previous step',
    }}
  >
    <Page label="step 1">
      <Typography align="center" variant="h5">
        Step 1
      </Typography>
    </Page>
    <Page label="step 2">
      <Typography align="center" variant="h5">
        Step 2
      </Typography>
    </Page>
    <Page label="step3">
      <Typography align="center" variant="h5">
        Step 3
      </Typography>
    </Page>
  </Wizard>
);

export const fullHeight = () => (
  <Wizard fullHeight open>
    <Page>
      <Typography align="center" variant="h5">
        Step 1
      </Typography>
    </Page>
    <Page>
      <Typography align="center" variant="h5">
        Step 2
      </Typography>
    </Page>
    <Page>
      <Typography align="center" variant="h5">
        Step 3
      </Typography>
    </Page>
  </Wizard>
);

export const smallWidth = () => (
  <Wizard open width="xs">
    <Page>
      <Typography align="center" variant="h5">
        Step 1
      </Typography>
    </Page>
    <Page>
      <Typography align="center" variant="h5">
        Step 2
      </Typography>
    </Page>
    <Page>
      <Typography align="center" variant="h5">
        Step 3
      </Typography>
    </Page>
  </Wizard>
);

export const withCustomExitAlertLabels = () => (
  <Wizard
    open
    exitConfirmProps={{
      labelConfirm: 'Exit',
      labelMessage: "Wizard's progress will not be saved",
      labelTitle: 'Exit wizard ?',
    }}
  >
    <Page>
      <Typography align="center" variant="h5">
        Step 1
      </Typography>
    </Page>
    <Page>
      <Typography align="center" variant="h5">
        Step 2
      </Typography>
    </Page>
    <Page>
      <Typography align="center" variant="h5">
        Step 3
      </Typography>
    </Page>
  </Wizard>
);

const FirstStep = ({ disableNextOnSendingRequests }) => {
  React.useEffect(() => {
    disableNextOnSendingRequests([true]);
  }, []);

  return (
    <Typography align="center" variant="h5">
      Sending request...
    </Typography>
  );
};

FirstStep.propTypes = {
  disableNextOnSendingRequests: PropTypes.func.isRequired,
};

export const stepWithSendingRequest = () => (
  <Wizard open>
    <Page>
      <FirstStep />
    </Page>
    <Page>
      <Typography align="center" variant="h5">
        Step 2
      </Typography>
    </Page>
  </Wizard>
);
