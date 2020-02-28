import React, { createContext, ReactNode, ReactElement } from 'react';

import Snackbar from '.';
import useMessage from './useMessage';

export interface SnackbarState {
  showMessage: ({ newMessage, newSeverity }) => void;
  showMessages: ({ newMessages, newSeverity }) => void;
}

const noOp = (): void => undefined;

const defaultSnackBarState: SnackbarState = {
  showMessage: noOp,
  showMessages: noOp,
};

const Context = createContext<SnackbarState>(defaultSnackBarState);

interface SnackbarContextProviderProps {
  children?: ReactNode;
}

const withSnackbar = (Component): ((props) => ReactElement) => {
  return (props: SnackbarContextProviderProps): ReactElement => {
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

export default withSnackbar;
export { Context as SnackbarContext };
