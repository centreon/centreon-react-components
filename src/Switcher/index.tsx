/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './switcher.scss';

interface Props {
  value?: boolean;
  onChange?: (toogled: boolean) => void;
  switcherStatus?: string;
  switcherTitle?: string;
  customClass?: string;
}

const Switcher = ({
  value = false,
  onChange,
  switcherStatus,
  switcherTitle,
  customClass,
}): JSX.Element => {
  const [toggled, setToggled] = useState<boolean>(value);

  const handleChange = (): void => {
    if (onChange) {
      onChange(!toggled);
    }
    setToggled(!toggled);
  };

  useEffect(() => {
    setToggled(value);
  }, [value]);

  return (
    <div className={clsx(styles.switcher, styles[customClass])}>
      <span className={clsx(styles['switcher-title'])}>
        {switcherTitle || ' '}
      </span>
      <span className={clsx(styles['switcher-status'])}>{switcherStatus}</span>
      <label
        className={clsx(
          styles.switch,
          styles[toggled ? 'switch-active' : 'switch-hide'],
        )}
      >
        <input type="checkbox" checked={toggled} onChange={handleChange} />
        <span
          className={clsx(styles['switch-slider'], styles['switch-round'])}
        />
      </label>
    </div>
  );
};

export default Switcher;

/* class Switcher extends React.Component {
  state = {
    value: true,
    toggled: false,
  };

  UNSAFE_componentDidMount = () => {
    const { value } = this.props;
    if (value) {
      this.setState({
        value,
      });
    }
  };

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    const { value } = nextProps;
    if (this.state.value !== value) {
      this.setState({
        toggled: !value,
        value,
      });
    }
  };

  onChange = () => {
    const { onChange, filterKey } = this.props;
    const { value, toggled } = this.state;
    this.setState({
      value: !value,
      toggled: !toggled,
    });
    if (onChange) {
      onChange(!value, filterKey);
    }
  };

  toggled = () => {
    const { toggled } = this.state;
    this.setState({
      toggled: !toggled,
    });
  };

  render() {
    const { switcherTitle, switcherStatus, customClass } = this.props;
    const { value, toggled } = this.state;

    return (
      <div className={clsx(styles.switcher, styles[customClass])}>
        <span className={clsx(styles['switcher-title'])}>
          {switcherTitle || ' '}
        </span>
        <span className={clsx(styles['switcher-status'])}>
          {switcherStatus}
        </span>
        <label
          className={clsx(
            styles.switch,
            styles[toggled ? 'switch-active' : 'switch-hide'],
          )}
        >
          <input
            type="checkbox"
            checked={!value}
            onClick={this.onChange.bind(this)}
          />
          <span
            className={clsx(styles['switch-slider'], styles['switch-round'])}
          />
        </label>
      </div>
    );
  }
}

export default Switcher; */
