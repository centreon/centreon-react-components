import React, { useState } from 'react';
import { SnackbarState } from './withSnackbar';

interface UseMessage extends SnackbarState {
  errorMessage;
  successMessage;
  confirmError: () => void;
  confirmSuccess: () => void;
}

const useMessage = (): UseMessage => {
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const confirmError = (): void => {
    setErrorMessage(undefined);
  };

  const showError = (message): void => {
    setErrorMessage(message);
  };

  const showErrors = (errors): void => {
    const errorKeys = Object.keys(errors);

    const formattedErrors = errorKeys.map(
      (errorKey) => `${errorKey}: ${errors[errorKey]}`,
      [],
    );

    showError(
      <div style={{ display: 'block' }}>
        {formattedErrors.map((err, index) => (
          <p style={{ margin: 0 }} key={errorKeys[index]}>
            {err}
          </p>
        ))}
      </div>,
    );
  };

  const confirmSuccess = (): void => {
    setSuccessMessage(undefined);
  };

  const showSuccess = (message): void => {
    setSuccessMessage(message);
  };

  const showSuccesses = (successes): void => {
    const successKeys = Object.keys(successes);

    const formattedSuccesses = successKeys.map(
      (successKey) => `${successKey}: ${successes[successKey]}`,
      [],
    );

    showSuccess(
      <div style={{ display: 'block' }}>
        {formattedSuccesses.map((err, index) => (
          <p style={{ margin: 0 }} key={successKeys[index]}>
            {err}
          </p>
        ))}
      </div>,
    );
  };

  return {
    confirmError,
    showError,
    showErrors,
    errorMessage,
    confirmSuccess,
    showSuccess,
    showSuccesses,
    successMessage,
  };
};

export default useMessage;
