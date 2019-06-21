/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */

import React from 'react';
import classnames from 'classnames';
import styles from './message-info.scss';

const MessageInfo = ({ messageInfo, text }) => {
  return (
    <span
      className={classnames(styles['message-info'], styles[messageInfo || ''])}
    >
      {text}
    </span>
  );
};

export default MessageInfo;
