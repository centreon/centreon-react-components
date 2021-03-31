/* eslint-disable no-useless-concat */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */

import React, { Component } from 'react';

import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';

import Link from '@material-ui/core/Link';
import { styled } from '@material-ui/styles';

import BoundingBox from '../BoundingBox';

import styles from './navigation.scss';

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
}));

class Navigation extends Component {
  state = {
    activeSecondLevel: null,
    doubleClickedLevel: null,
    hrefOfIframe: false,
    navigatedPageId: false,
  };

  componentDidMount() {
    window.addEventListener('react.href.update', this.watchHrefChange, false);
  }

  componentWillUnmount() {
    window.removeEventListener('react.href.update', this.watchHrefChange);
  }

  watchHrefChange = (event) => {
    if (event.detail.href.match(/p=/)) {
      this.setState({
        hrefOfIframe: event.detail.href,
      });
    }
  };

  getUrlFromEntry = (entryProps) => {
    const urlOptions =
      entryProps.page + (entryProps.options !== null ? entryProps.options : '');
    const url = entryProps.is_react
      ? entryProps.url
      : `/main.php?p=${urlOptions}`;
    return url;
  };

  activateSecondLevel = (secondLevelPage) => {
    const { activeSecondLevel } = this.state;

    this.setState({
      activeSecondLevel:
        activeSecondLevel === secondLevelPage ? true : secondLevelPage,
    });
  };

  getActiveTopLevelIndex = (pageId) => {
    const { navigationData } = this.props;
    let index = -1;
    for (let i = 0; i < navigationData.length; i++) {
      if (
        !isNaN(pageId) &&
        String(pageId).charAt(0) === navigationData[i].page
      ) {
        index = i;
      }
    }
    return index;
  };

  onNavigate = (id, url) => {
    const { onNavigate } = this.props;
    this.setState({
      hrefOfIframe: false,
      navigatedPageId: id,
    });
    onNavigate(id, url);
  };

  areSamePage = (page, level, imersion) => {
    return imersion
      ? !isNaN(page) && String(page).substring(0, imersion) === level.page
      : !isNaN(page) && page === level.page;
  };

  render() {
    const { navigationData, sidebarActive, reactRoutes } = this.props;
    const {
      activeSecondLevel,
      doubleClickedLevel,
      navigatedPageId,
      hrefOfIframe,
    } = this.state;
    let pageId = '';
    const { pathname, search } = window.location;

    if (navigatedPageId && !hrefOfIframe) {
      pageId = navigatedPageId;
    } else if (hrefOfIframe) {
      if (hrefOfIframe.match(/p=/)) {
        pageId = hrefOfIframe.split('p=')[1];
        if (pageId) {
          pageId = pageId.split('&')[0];
        }
      } else {
        pageId = reactRoutes[hrefOfIframe] || hrefOfIframe;
      }
    } else if (search.match(/p=/)) {
      pageId = search.split('p=')[1].split('&')[0];
    } else {
      pageId = reactRoutes[pathname] || pathname;
    }

    const activeIndex = this.getActiveTopLevelIndex(pageId);

    return (
      <ul
        className={clsx(
          styles.menu,
          styles['menu-items'],
          styles['list-unstyled'],
          styles[sidebarActive ? 'menu-big' : 'menu-small'],
        )}
      >
        {navigationData.map((firstLevel, firstLevelIndex) => {
          const firstLevelIsActive =
            firstLevel.toggled || this.areSamePage(pageId, firstLevel, 1);
          return (
            <li
              className={clsx(
                styles['menu-item'],
                styles[`color-${firstLevel.color}`],
                {
                  [styles.active]: firstLevelIsActive,
                  [styles[`active-${firstLevel.color}`]]: firstLevelIsActive,
                },
              )}
              key={`firstLevel-${firstLevel.page}`}
            >
              <span className={clsx(styles['menu-item-link'])}>
                <StyledLink
                  className={clsx(
                    styles.iconmoon,
                    styles[`icon-${firstLevel.icon}`],
                  )}
                  component={RouterLink}
                  to={this.getUrlFromEntry(firstLevel)}
                  onClick={(e) => {
                    if (doubleClickedLevel) {
                      this.setState({
                        doubleClickedLevel: null,
                        hrefOfIframe: false,
                      });
                    } else {
                      e.preventDefault();
                    }
                  }}
                  onDoubleClick={(e) => {
                    const target = e.target;
                    this.setState(
                      {
                        doubleClickedLevel: firstLevel,
                        hrefOfIframe: false,
                      },
                      () => {
                        target.click();
                      },
                    );
                  }}
                >
                  <span className={clsx(styles['menu-item-name'])}>
                    {firstLevel.label}
                  </span>
                </StyledLink>
              </span>
              <ul
                className={clsx(
                  styles.collapse,
                  styles['collapsed-items'],
                  styles['list-unstyled'],
                  styles[`border-${firstLevel.color}`],
                  styles[
                    activeIndex !== -1 &&
                    firstLevelIndex > activeIndex &&
                    sidebarActive &&
                    navigationData[activeIndex].children.length >= 5
                      ? 'towards-down'
                      : 'towards-up'
                  ],
                )}
              >
                {firstLevel.children.map((secondLevel) => {
                  const secondLevelIsActive =
                    activeSecondLevel === secondLevel.page ||
                    (!activeSecondLevel &&
                      this.areSamePage(pageId, secondLevel, 3));
                  const secondLevelIsColored =
                    secondLevel.toggled ||
                    this.areSamePage(pageId, secondLevel, 3);
                  return (
                    <li
                      className={clsx(styles['collapsed-item'], {
                        [styles.active]: secondLevelIsActive,
                        [styles[
                          `active-${firstLevel.color}`
                        ]]: secondLevelIsColored,
                      })}
                      key={`secondLevel-${secondLevel.page}`}
                    >
                      <StyledLink
                        className={clsx(
                          styles['collapsed-item-level-link'],
                          styles[`color-${firstLevel.color}`],
                          {
                            [styles['img-none']]: secondLevel.groups.length < 1,
                          },
                        )}
                        component={RouterLink}
                        to={this.getUrlFromEntry(secondLevel)}
                        onClick={(e) => {
                          if (secondLevel.groups.length > 0) {
                            e.preventDefault(); // do not redirect if level 2 has children
                            this.activateSecondLevel(secondLevel.page);
                          } else {
                            this.setState({
                              hrefOfIframe: false,
                              navigatedPageId: secondLevel.page,
                            });
                          }
                        }}
                      >
                        {secondLevel.label}
                      </StyledLink>
                      <BoundingBox active>
                        {({ rectBox }) => {
                          let styleFor3rdLevel = {};
                          if (rectBox && rectBox.bottom < 1) {
                            styleFor3rdLevel = {
                              height: rectBox.offsetHeight + rectBox.bottom,
                            };
                          }
                          return (
                            <ul
                              className={clsx(
                                styles['collapsed-level-items'],
                                styles['list-unstyled'],
                              )}
                              style={styleFor3rdLevel}
                            >
                              {secondLevel.groups.map((group) => (
                                <React.Fragment
                                  key={`thirdLevelFragment-${group.label}`}
                                >
                                  {secondLevel.groups.length > 1 ? (
                                    <span
                                      className={clsx(
                                        styles['collapsed-level-title'],
                                      )}
                                    >
                                      <span>{group.label}</span>
                                    </span>
                                  ) : null}
                                  {group.children.map((thirdLevel) => {
                                    const thirdLevelIsActive =
                                      thirdLevel.toggled ||
                                      this.areSamePage(pageId, thirdLevel);
                                    return (
                                      <li
                                        className={clsx(
                                          styles['collapsed-level-item'],
                                          {
                                            [styles.active]: thirdLevelIsActive,
                                            [styles[
                                              `active-${firstLevel.color}`
                                            ]]: thirdLevelIsActive,
                                          },
                                        )}
                                        key={`thirdLevel-${thirdLevel.page}`}
                                      >
                                        <StyledLink
                                          className={clsx(
                                            styles['collapsed-item-level-link'],
                                            styles[`color-${firstLevel.color}`],
                                          )}
                                          component={RouterLink}
                                          to={this.getUrlFromEntry(thirdLevel)}
                                          onClick={() => {
                                            this.setState({
                                              hrefOfIframe: false,
                                              navigatedPageId: thirdLevel.page,
                                            });
                                          }}
                                        >
                                          {thirdLevel.label}
                                        </StyledLink>
                                      </li>
                                    );
                                  })}
                                </React.Fragment>
                              ))}
                            </ul>
                          );
                        }}
                      </BoundingBox>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Navigation;
