/* eslint-disable no-alert */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';

import ButtonActionInput from '.';

export default { title: 'Button/ActionInput' };

export const greenArrowRight = () => (
  <ButtonActionInput
    buttonColor="green"
    iconColor="white"
    buttonActionType="delete"
    buttonIconType="arrow-right"
  />
);
