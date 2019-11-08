import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import Typography from '@material-ui/core/Typography';
import Wizard, { Page } from '.';

describe('Wizard', () => {
  it('displays step labels', () => {
    const { getByText } = render(
      <Wizard open>
        <Page label="step label 1"><div>Step 1</div></Page>
        <Page label="step label 2"><div>Step 2</div></Page>
        <Page label="step label 3"><div>Step 3</div></Page>
      </Wizard>,
    );

    expect(getByText('step label 1')).toBeInTheDocument();
    expect(getByText('step label 2')).toBeInTheDocument();
    expect(getByText('step label 3')).toBeInTheDocument();
  });

  it('goes to next and previous steps', async () => {
    const { getByText } = render(
      <Wizard open>
        <Page label="step 1">
          <div>Step 1</div>
        </Page>
        <Page label="step 2">
          <div>Step 2</div>
        </Page>
        <Page label="step3">
          <div>Step 3</div>
        </Page>
      </Wizard>,
    );

    await act(async () => {
      fireEvent.click(getByText('Next').parentNode);
    });

    expect(getByText('Step 2')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(getByText('Previous').parentNode);
    });

    expect(getByText('Step 1')).toBeInTheDocument();
  });
});
