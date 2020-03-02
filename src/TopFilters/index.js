/* eslint-disable react/no-array-index-key */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

import React, { Component, Fragment } from 'react';
import clsx from 'clsx';
import styles from '../global-sass-files/_grid.scss';
import filterStyles from './top-filters.scss';
import Wrapper from '../Wrapper';
import SearchLive from '../Search/SearchLive';
import {Switch, FormControlLabel} from '@material-ui/core';
import Button from '../Button';

class TopFilters extends Component {
  render() {
    const { fullText, switchers, onChange } = this.props;

    return (
      <div className={styles['container-gray']}>
        <div className={filterStyles['filters-wrapper']}>
          <Wrapper>
            <div className={clsx(styles.container__row)}>
              {fullText ? (
                <div
                  className={clsx(
                    styles['container__co"top"l-md-3'],
                    styles['container__col-xs-12'],
                  )}
                >
                  <SearchLive
                    icon={fullText.icon}
                    onChange={onChange}
                    label={fullText.label}
                    value={fullText.value}
                    filterKey={fullText.filterKey}
                  />
                </div>
              ) : null}

              <div className={clsx(styles.container__row)}>
                {switchers
                  ? switchers.map((switcherColumn, index) => (
                    <div
                      key={`switcherSubColumn${index}`}
                      className={filterStyles['switch-wrapper']}
                    >
                      {switcherColumn.map(
                          (
                            {
                              switcherTitle,
                              switcherStatus,
                              button,
                              label,
                              buttonType,
                              color,
                              onClick,
                              value,
                              filterKey,
                            },
                            i,
                          ) =>
                            !button ? (
                              <FormControlLabel
                                control={<Switch color="primary" onChange={(e) => onChange(e.target.value, filterKey)} />}
                                label={<>
                                  {switcherTitle && <div><b>{switcherTitle}</b></div>}
                                {switcherStatus && <div>{switcherStatus}</div>}
                                  </>}
                                labelPlacement="top"
                              />
                            ) : (
                              <div
                                key={`switcher${index}${i}`}
                                className={clsx(
                                  styles['container__col-sm-6'],
                                  styles['container__col-xs-4'],
                                  styles['center-vertical'],
                                  styles['mt-1'],
                                  filterStyles['button-wrapper'],
                                )}
                              >
                                <Button
                                  key={`switcherButton${index}${i}`}
                                  label={label}
                                  buttonType={buttonType}
                                  color={color}
                                  onClick={onClick}
                                />
                              </div>
                            ),
                        )}
                    </div>
                    ))
                  : null}
              </div>
            </div>
          </Wrapper>
        </div>
      </div>
    );
  }
}

export default TopFilters;
