/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import classnames from 'classnames';
import { storiesOf } from '@storybook/react';
import styles from '../src/global-sass-files/_grid.scss';
import {
  Wrapper,
  TopFilters,
  Button,
  HorizontalLineContent,
  Card,
  CardItem,
  IconInfo,
  Title,
  Subtitle,
  ButtonAction,
  CustomRow,
  CustomColumn,
  CustomStyles,
} from '../src';

storiesOf('Pages', module).add(
  'Extensions page',
  () => (
    <React.Fragment>
      <TopFilters
        fullText={{
          label: 'Search:',
          onChange: (a) => {
            console.log(a);
          },
        }}
        switchers={[
          [
            {
              customClass: classnames(
                styles['container__col-md-3'],
                styles['container__col-xs-4'],
              ),
              switcherTitle: 'Status:',
              switcherStatus: 'Not installed',
              defaultValue: false,
              onChange: (value) => {
                console.log(value);
              },
            },
            {
              customClass: classnames(
                styles['container__col-md-3'],
                styles['container__col-xs-4'],
              ),
              switcherStatus: 'Installed',
              defaultValue: false,
              onChange: (value) => {
                console.log(value);
              },
            },
            {
              customClass: classnames(
                styles['container__col-md-3'],
                styles['container__col-xs-4'],
              ),
              switcherStatus: 'Update',
              defaultValue: false,
              onChange: (value) => {
                console.log(value);
              },
            },
          ],
          [
            {
              customClass: classnames(
                styles['container__col-sm-3'],
                styles['container__col-xs-4'],
              ),
              switcherTitle: 'Type:',
              switcherStatus: 'Module',
              defaultValue: false,
              onChange: (value) => {
                console.log(value);
              },
            },
            {
              customClass: classnames(
                styles['container__col-sm-3'],
                styles['container__col-xs-4'],
              ),
              switcherStatus: 'Update',
              defaultValue: false,
              onChange: (value) => {
                console.log(value);
              },
            },
            {
              button: true,
              label: 'Clear Filters',
              color: 'black',
              buttonType: 'bordered',
              onClick: () => {
                console.log('Clear filters clicked');
              },
            },
          ],
        ]}
      />
      <Wrapper>
        <Button
          label="update all"
          buttonType="regular"
          color="orange"
          customClass="mr-2"
        />
        <Button
          label="install all"
          buttonType="regular"
          color="green"
          customClass="mr-2"
        />
        <Button label="upload license" buttonType="regular" color="blue" />
      </Wrapper>
      <Wrapper>
        <HorizontalLineContent hrTitle="Modules" />
        <Card>
          <CustomRow>
            <CustomColumn
              customColumn="md-3"
              additionalStyles={['display-flex', 'container__col-xs-12']}
            >
              <CardItem
                itemBorderColor="orange"
                itemFooterColor="red"
                itemFooterLabel="Licence expire at 12/08/2019"
                onClick={() => {
                  alert('Card clicked- open popin');
                }}
              >
                <IconInfo
                  iconName="state"
                  iconColor="green"
                  iconPosition="info-icon-position"
                />
                <CustomStyles customStyles={['custom-title-heading']}>
                  <Title
                    icon="object"
                    label="Engine-status"
                    customTitleStyles="custom-title-styles"
                    onClick={() => {
                      alert('Card clicked- open popin');
                    }}
                  />
                  <Subtitle
                    label="by Centreon"
                    customSubtitleStyles="custom-subtitle-styles"
                    onClick={() => {
                      alert('Card clicked- open popin');
                    }}
                  />
                </CustomStyles>
                <Button
                  buttonType="regular"
                  color="orange"
                  label="Available 3.1.5"
                  iconActionType="update"
                  iconColor="white"
                  position="button-card-position"
                  onClick={() => {
                    alert('Button clicked');
                  }}
                />
              </CardItem>
            </CustomColumn>
            <CustomColumn
              customColumn="md-3"
              additionalStyles={['display-flex', 'container__col-xs-12']}
            >
              <CardItem
                itemBorderColor="green"
                itemFooterColor="orange"
                itemFooterLabel="Licence expire at 12/08/2019"
                onClick={() => {
                  alert('Card clicked- open popin');
                }}
              >
                <IconInfo
                  iconName="state"
                  iconColor="green"
                  iconPosition="info-icon-position"
                />
                <CustomStyles customStyles={['custom-title-heading']}>
                  <Title
                    icon="object"
                    label="Engine-status"
                    customTitleStyles="custom-title-styles"
                    onClick={() => {
                      alert('Card clicked- open popin');
                    }}
                  />
                  <Subtitle
                    label="by Centreon"
                    customSubtitleStyles="custom-subtitle-styles"
                    onClick={() => {
                      alert('Card clicked- open popin');
                    }}
                  />
                </CustomStyles>
                <Button
                  buttonType="bordered"
                  color="blue"
                  label="Available 2.3.5"
                  iconActionType="update"
                  iconColor="white"
                  position="button-card-position"
                  onClick={() => {
                    alert('Button clicked');
                  }}
                />
                <ButtonAction
                  iconColor="gray"
                  buttonActionType="delete"
                  buttonIconType="delete"
                  customPosition="button-action-card-position"
                  onClick={() => {
                    alert('Button delete clicked');
                  }}
                />
              </CardItem>
            </CustomColumn>
            <CustomColumn
              customColumn="md-3"
              additionalStyles={['display-flex', 'container__col-xs-12']}
            >
              <CardItem
                itemBorderColor="gray"
                onClick={() => {
                  alert('Card clicked- open popin');
                }}
              >
                <CustomStyles customStyles={['custom-title-heading']}>
                  <Title
                    icon="object"
                    label="Engine-status"
                    customTitleStyles="custom-title-styles"
                    onClick={() => {
                      alert('Card clicked- open popin');
                    }}
                  />
                  <Subtitle
                    label="by Centreon"
                    customSubtitleStyles="custom-subtitle-styles"
                    onClick={() => {
                      alert('Card clicked- open popin');
                    }}
                  />
                </CustomStyles>
                <Button
                  buttonType="regular"
                  color="green"
                  label="Available 3.1.5"
                  iconActionType="add"
                  iconColor="white"
                  position="button-card-position"
                  onClick={() => {
                    alert('Button clicked');
                  }}
                />
              </CardItem>
            </CustomColumn>
            <CustomColumn
              customColumn="md-3"
              additionalStyles={['display-flex', 'container__col-xs-12']}
            >
              <CardItem
                itemBorderColor="gray"
                onClick={() => {
                  alert('Card clicked- open popin');
                }}
              >
                <CustomStyles customStyles={['custom-title-heading']}>
                  <Title
                    icon="object"
                    label="Engine-status"
                    customTitleStyles="custom-title-styles"
                    onClick={() => {
                      alert('Card clicked- open popin');
                    }}
                  />
                  <Subtitle
                    label="by Centreon"
                    customSubtitleStyles="custom-subtitle-styles"
                    onClick={() => {
                      alert('Card clicked- open popin');
                    }}
                  />
                </CustomStyles>
                <Button
                  buttonType="regular"
                  color="green"
                  label="Available 3.1.5"
                  iconActionType="add"
                  iconColor="white"
                  position="button-card-position"
                  onClick={() => {
                    alert('Button clicked');
                  }}
                />
              </CardItem>
            </CustomColumn>
          </CustomRow>
        </Card>
      </Wrapper>
      <Wrapper>
        <HorizontalLineContent
          hrColor="blue"
          hrTitleColor="blue"
          hrTitle="Widgets"
        />
        <Card>
          <CustomRow>
            <CustomColumn
              customColumn="md-3"
              additionalStyles={['display-flex', 'container__col-xs-12']}
            >
              <CardItem
                itemBorderColor="orange"
                itemFooterColor="blue"
                itemFooterLabel="Licence 5 hosts"
                onClick={() => {
                  alert('Card clicked- open popin');
                }}
              >
                <IconInfo iconName="state green" />
                <CustomStyles customStyles={['custom-title-heading']}>
                  <Title
                    icon="puzzle"
                    label="Plugin pack manager"
                    titleColor="blue"
                    customTitleStyles="custom-title-styles"
                    onClick={() => {
                      alert('Card clicked- open popin');
                    }}
                  />
                  <Subtitle
                    label="by Centreon"
                    customSubtitleStyles="custom-subtitle-styles"
                    onClick={() => {
                      alert('Card clicked- open popin');
                    }}
                  />
                </CustomStyles>
                <Button
                  buttonType="regular"
                  color="orange"
                  label="Available 3.1.5"
                  iconActionType="update"
                  iconColor="white"
                  position="button-card-position"
                  onClick={() => {
                    alert('Button clicked');
                  }}
                />
                <ButtonAction
                  iconColor="gray"
                  buttonActionType="delete"
                  buttonIconType="delete"
                  customPosition="button-action-card-position"
                  onClick={() => {
                    alert('Button delete clicked');
                  }}
                />
              </CardItem>
            </CustomColumn>
            <CustomColumn
              customColumn="md-3"
              additionalStyles={['display-flex', 'container__col-xs-12']}
            >
              <CardItem
                itemBorderColor="green"
                itemFooterColor="red"
                itemFooterLabel="Licence expire at 12/08/2019"
                onClick={() => {
                  alert('Card clicked- open popin');
                }}
              >
                <IconInfo iconName="state green" />
                <CustomStyles customStyles={['custom-title-heading']}>
                  <Title
                    icon="puzzle"
                    label="Plugin pack manager"
                    titleColor="blue"
                    customTitleStyles="custom-title-styles"
                    onClick={() => {
                      alert('Card clicked- open popin');
                    }}
                  />
                  <Subtitle
                    label="by Centreon"
                    customSubtitleStyles="custom-subtitle-styles"
                    onClick={() => {
                      alert('Card clicked- open popin');
                    }}
                  />
                </CustomStyles>
                <Button
                  buttonType="bordered"
                  color="blue"
                  label="Available 3.5.6"
                  iconActionType="update"
                  iconColor="white"
                  position="button-card-position"
                  onClick={() => {
                    alert('Button clicked');
                  }}
                />
                <ButtonAction
                  iconColor="gray"
                  buttonActionType="delete"
                  buttonIconType="delete"
                  customPosition="button-action-card-position"
                  onClick={() => {
                    alert('Button delete clicked');
                  }}
                />
              </CardItem>
            </CustomColumn>
            <CustomColumn
              customColumn="md-3"
              additionalStyles={['display-flex', 'container__col-xs-12']}
            >
              <CardItem
                itemBorderColor="gray"
                onClick={() => {
                  alert('Card clicked- open popin');
                }}
              >
                <CustomStyles customStyles={['custom-title-heading']}>
                  <Title
                    icon="puzzle"
                    label="Plugin pack manager"
                    titleColor="blue"
                    customTitleStyles="custom-title-styles"
                    onClick={() => {
                      alert('Card clicked- open popin');
                    }}
                  />
                  <Subtitle
                    label="by Centreon"
                    customSubtitleStyles="custom-subtitle-styles"
                    onClick={() => {
                      alert('Card clicked- open popin');
                    }}
                  />
                </CustomStyles>
                <Button
                  buttonType="regular"
                  color="green"
                  label="Available 3.1.5"
                  iconActionType="add"
                  iconColor="white"
                  position="button-card-position"
                  onClick={() => {
                    alert('Button clicked');
                  }}
                />
              </CardItem>
            </CustomColumn>
            <CustomColumn
              customColumn="md-3"
              additionalStyles={['display-flex', 'container__col-xs-12']}
            >
              <CardItem
                itemBorderColor="gray"
                onClick={() => {
                  alert('Card clicked- open popin');
                }}
              >
                <CustomStyles customStyles={['custom-title-heading']}>
                  <Title
                    icon="puzzle"
                    label="Plugin pack manager"
                    titleColor="blue"
                    customTitleStyles="custom-title-styles"
                    onClick={() => {
                      alert('Card clicked- open popin');
                    }}
                  />
                  <Subtitle
                    label="by Centreon"
                    customSubtitleStyles="custom-subtitle-styles"
                    onClick={() => {
                      alert('Card clicked- open popin');
                    }}
                  />
                </CustomStyles>
                <Button
                  buttonType="regular"
                  color="green"
                  label="Available 3.1.5"
                  iconActionType="add"
                  iconColor="white"
                  position="button-card-position"
                  onClick={() => {
                    alert('Button clicked');
                  }}
                />
              </CardItem>
            </CustomColumn>
          </CustomRow>
        </Card>
      </Wrapper>
    </React.Fragment>
  ),
  { notes: 'A very simple component' },
);
