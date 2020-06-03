import React, { createContext, ReactNode, ReactElement } from 'react';

import Snackbar from '.';
import useMessage from './useMessage';

export interface SnackbarActions {
  showMessage: ({ message, severity }) => void;
  showMessages: ({ messages, severity }) => void;
}

const noOp = (): void => undefined;

const defaultSnackBarState: SnackbarActions = {
  showMessage: noOp,
  showMessages: noOp,
};

const Context = createContext<SnackbarActions>(defaultSnackBarState);

interface SnackbarContextProviderProps {
  children?: ReactNode;
}

const withSnackbar = (
  Component: (props) => JSX.Element,
): ((props) => ReactElement) => {
  return (props: SnackbarContextProviderProps): JSX.Element => {
    const {
      message,
      severity,
      showMessage,
      showMessages,
      confirmMessage,
    } = useMessage();

    const hasMessage = message !== undefined;

    return (
      <Context.Provider value={{ showMessage, showMessages }}>
        <Component {...props} />
        <Snackbar
          severity={severity}
          onClose={confirmMessage}
          open={hasMessage}
          message={message}
        />
      </Context.Provider>
    );
  };
};

export { Context as SnackbarContext };

export default withSnackbar;
