/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import clsx from 'clsx';
import { Switch, FormControlLabel } from '@material-ui/core';
import styles from '../global-sass-files/_grid.scss';
import filterStyles from './top-filters.scss';
import Wrapper from '../Wrapper';
import SearchLive from '../Search/SearchLive';
import Button from '../Button';

class TopFilters extends Component {
  render() {
    const { fullText, switchs, onChange } = this.props;

    return (
      <div className={styles['container-gray']}>
        <div className={filterStyles['filters-wrapper']}>
          <Wrapper>
            <div className={clsx(styles.container__row)}>
              {fullText ? (
                <div
                  className={clsx(
                    styles['container__col-md-3'],
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
                {switchs
                  ? switchs.map((switchColumn, index) => (
                      <div
                        key={`switchSubColumn${index}`}
                        className={filterStyles['switch-wrapper']}
                      >
                        {switchColumn.map(
                          (
                            {
                              switchTitle,
                              switchStatus,
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
                                control={
                                  <Switch
                                    checked={value}
                                    color="primary"
                                    onChange={(e) =>
                                      onChange(e.target.checked, filterKey)
                                    }
                                  />
                                }
                                label={
                                  <>
                                    {switchTitle && (
                                      <div>
                                        <b>{switchTitle}</b>
                                      </div>
                                    )}
                                    {switchStatus && <div>{switchStatus}</div>}
                                  </>
                                }
                                labelPlacement="top"
                              />
                            ) : (
                              <div
                                key={`switch${index}${i}`}
                                className={clsx(
                                  styles['container__col-sm-6'],
                                  styles['container__col-xs-4'],
                                  styles['center-vertical'],
                                  styles['mt-1'],
                                  filterStyles['button-wrapper'],
                                )}
                              >
                                <Button
                                  key={`switchButton${index}${i}`}
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
