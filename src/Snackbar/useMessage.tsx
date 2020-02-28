import React, { useState } from 'react';
import { SnackbarState } from './withSnackbar';

interface UseMessage extends SnackbarState {
  message;
  severity;
  confirmMessage: () => void;
}

const useMessage = (): UseMessage => {
  const [message, setMessage] = useState();
  const [severity, setSeverity] = useState();

  const confirmMessage = (): void => {
    setMessage(undefined);
    setSeverity(undefined);
  };

  const showMessage = ({ newMessage, newSeverity }): void => {
    setMessage(newMessage);
    setSeverity(newSeverity);
  };

  const showMessages = ({ newMessages, newSeverity }): void => {
    const messageKeys = Object.keys(newMessages);

    const formattedMessages = messageKeys.map(
      (messageKey) => `${messageKey}: ${newMessages[messageKey]}`,
      [],
    );

    showMessage({
      newMessage: (
        <div style={{ display: 'block' }}>
          {formattedMessages.map((err, index) => (
            <p style={{ margin: 0 }} key={messageKeys[index]}>
              {err}
            </p>
          ))}
        </div>
      ),
      newSeverity,
    });
  };

  console.log(severity);

  return {
    message,
    severity,
    confirmMessage,
    showMessage,
    showMessages,
  };
};

export default useMessage;
