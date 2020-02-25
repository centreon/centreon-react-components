import React, { createContext, ReactNode, ReactElement } from 'react';

import Snackbar from '.';
import useMessage from './useMessage';

export interface SnackbarState {
  showError: (message) => void;
  showErrors: (errors) => void;
  showSuccess: (message) => void;
  showSuccesses: (successes) => void;
}

const noOp = (): void => undefined;

const defaultSnackBarState: SnackbarState = {
  showError: noOp,
  showErrors: noOp,
  showSuccess: noOp,
  showSuccesses: noOp,
};

const Context = createContext<SnackbarState>(defaultSnackBarState);

interface SnackbarContextProviderProps {
  children?: ReactNode;
}

const withSnackbar = (Component): ((props) => ReactElement) => {
  return (props: SnackbarContextProviderProps): ReactElement => {
    const {
      confirmError,
      showError,
      showErrors,
      errorMessage,
      confirmSuccess,
      showSuccess,
      showSuccesses,
      successMessage,
    } = useMessage();

    const hasError = errorMessage !== undefined;
    const hasSuccess = successMessage !== undefined;

    return (
      <Context.Provider
        value={{ showError, showErrors, showSuccess, showSuccesses }}
      >
        <Component {...props} />
        <Snackbar
          isError
          onClose={confirmError}
          open={hasError}
          message={errorMessage}
        />
        <Snackbar
          onClose={confirmSuccess}
          open={hasSuccess}
          message={successMessage}
        />
      </Context.Provider>
    );
  };
};

export default withSnackbar;
export { Context as SnackbarContext };
