import React, { Component } from "react";
import classnames from 'classnames';
import styles from '../global-sass-files/_grid.scss';
import filterStyles from './top-filters.scss';
import Wrapper from "../Wrapper";
import SearchLive from "../Search/SearchLive";
import Switcher from "../Switcher";
import Button from "../Button/ButtonRegular";

class TopFilters extends Component {
  render() {
    const { fullText, switchers, onChange, icon } = this.props;

    return (
      <div className={styles["container-gray"]}>
        <Wrapper>
          <div className={classnames(styles["container__row"])}>
            {fullText ? (
              <SearchLive
                icon={fullText.icon}
                onChange={onChange}
                label={fullText.label}
                value={fullText.value}
                filterKey={fullText.filterKey}
              />
            ) : null}

              <div className={classnames(styles["container__row"])}>
                {switchers
                  ? switchers.map((switcherColumn, index) => (
                    <div
                      key={`switcherSubColumn${index}`}
                      className={filterStyles["switch-wrapper"]}
                    >
                      {switcherColumn.map(
                        (
                          {
                            customClass,
                            switcherTitle,
                            switcherStatus,
                            button,
                            label,
                            buttonType,
                            color,
                            onClick,
                            filterKey,
                            value
                          },
                          i
                        ) =>
                          !button ? (
                            <Switcher
                              key={`switcher${index}${i}`}
                              customClass={customClass}
                              {...(switcherTitle ? { switcherTitle } : {})}
                              switcherStatus={switcherStatus}
                              filterKey={filterKey}
                              onChange={onChange}
                              value={value}
                            />
                          ) : (
                            <div
                              key={`switcher${index}${i}`}
                              className={classnames(
                                styles["container__col-sm-6"],
                                styles["container__col-xs-4"],
                                styles["center-vertical"],
                                styles["mt-1"]
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
                          )
                      )}
                    </div>
                  ))
                : null}
            </div>
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default TopFilters;
