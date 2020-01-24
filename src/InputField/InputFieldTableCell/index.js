/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */

import React from 'react';
import clsx from 'clsx';
import styles from './input-table-cell.scss';
import IconInfo from '../../Icon/IconInfo';

const InputField = ({
  label,
  placeholder,
  topRightLabel,
  name,
  inputSize,
  error,
  iconName,
  iconColor,
  noMargin,
  ariaLabel,
  reference = () => {},
  ...rest
}) => {
  return (
    <div
      className={clsx(
        styles['form-group'],
        styles[inputSize || ''],
        error ? styles['has-danger'] : '',
        noMargin ? styles['no-bottom-margin'] : '',
      )}
    >
      {label && (
        <label htmlFor={rest.id}>
          <span>
            {iconName ? (
              <IconInfo iconName={iconName} iconColor={iconColor} />
            ) : null}
            {label}
          </span>
          <span className={clsx(styles['label-option'], styles.required)}>
            {topRightLabel || null}
          </span>
        </label>
      )}
      <input
        name={name}
        type="number"
        min="0"
        max="100"
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={clsx(styles['form-control'])}
        ref={reference}
        {...rest}
      />
      {error ? (
        <div className={clsx(styles['form-error'])}>{error}</div>
      ) : null}
    </div>
  );
};

export { InputField };

export default InputField;
