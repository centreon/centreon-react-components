/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */

import React from 'react';
import classnames from 'classnames';
import styles from './info-state-icon.scss';

const IconInfo = ({
  iconText,
  iconName = null,
  iconColor = null,
  iconPosition = null,
}) => {
  const cn = classnames(
    styles.info,
    { [styles[`info-${iconName}`]]: true },
    styles[iconPosition || ''],
    styles[iconColor || ''],
  );
  return (
    <React.Fragment>
      {iconName && <span className={cn} />}
      {iconText && (
        <span className={classnames(styles['info-text'])}>{iconText}</span>
      )}
    </React.Fragment>
  );
};

export default IconInfo;
