/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import classnames from 'classnames';
import styles from './switcher.scss';

class Switcher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: true,
      toggled: false,
    };
  }

  // eslint-disable-next-line
  UNSAFE_componentDidMount() {
    const { value } = this.props;
    if (value) {
      this.setState({
        value,
      });
    }
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    if (this.state.value !== value) {
      this.setState({
        toggled: !value,
        value,
      });
    }
  }

  onChange() {
    const { onChange, filterKey } = this.props;
    const { value, toggled } = this.state;
    this.setState({
      value: !value,
      toggled: !toggled,
    });
    if (onChange) {
      onChange(!value, filterKey);
    }
  }

  toggled() {
    const { toggled } = this.state;
    this.setState({
      toggled: !toggled,
    });
  }

  render() {
    const { switcherTitle, switcherStatus, customClass } = this.props;
    const { value, toggled } = this.state;

    return (
      <div className={classnames(styles.switcher, styles[customClass])}>
        <span className={classnames(styles['switcher-title'])}>
          {switcherTitle || ' '}
        </span>
        <span className={classnames(styles['switcher-status'])}>
          {switcherStatus}
        </span>
        <label
          className={classnames(
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
            className={classnames(
              styles['switch-slider'],
              styles['switch-round'],
            )}
          />
        </label>
      </div>
    );
  }
}

export default Switcher;
