/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import classnames from 'classnames';
import IconAction from '../../Icon/IconAction';
import styles from './button-action-input.scss';

const ButtonActionInput = ({
  buttonIconType,
  onClick,
  buttonColor,
  iconColor,
  buttonPosition,
}) => {
  const cn = classnames(
    styles['button-action-input'],
    styles[buttonColor || ''],
    styles[buttonPosition || ''],
  );
  return (
    <span className={cn} onClick={onClick}>
      <IconAction iconColor={iconColor || ''} iconActionType={buttonIconType} />
    </span>
  );
};

export default ButtonActionInput;
