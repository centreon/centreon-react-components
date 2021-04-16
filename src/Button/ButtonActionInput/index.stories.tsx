import React from 'react';

import ButtonActionInput from '.';

export default { title: 'Button/ActionInput' };

export const greenArrowRight = (): JSX.Element => (
  <ButtonActionInput
    buttonColor="green"
    buttonIconType="arrow-right"
    iconColor="white"
    onClick={() => null}
  />
);
