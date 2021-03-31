import * as React from 'react';

import { isEmpty } from 'ramda';

import {
  makeStyles,
  Paper,
  Slide,
  Divider,
  AppBar,
  Tabs,
  Theme,
} from '@material-ui/core';
import IconClose from '@material-ui/icons/Clear';
import IconButton from '../Button/Icon';

type StylesProps = Pick<Props, 'headerBackgroundColor' | 'width'>;

const useStyles = makeStyles<Theme, StylesProps>((theme) => ({
  body: {
    display: 'grid',
    gridArea: '3 / 1 / 4 / 1',
    gridTemplateRows: 'auto 1fr',
    height: '100%',
    width: ({ width }) => width,
  },
  container: {
    display: 'grid',
    gridTemplate: 'auto auto 1fr / 1fr',
    height: '100%',
  },
  content: {
    bottom: 0,
    left: 0,
    overflow: 'auto',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  contentContainer: {
    backgroundColor: theme.palette.background.default,
    position: 'relative',
  },
  divider: {
    gridArea: '2 / 1 / 3 / 1',
  },
  header: {
    alignItems: 'center',
    backgroundColor: ({ headerBackgroundColor }) => headerBackgroundColor,
    display: 'grid',
    gridArea: '1 / 1 / 2 / 1',
    gridTemplateColumns: '1fr auto',
    padding: theme.spacing(1),
  },
}));

export interface Tab {
  id: number;
  tab: JSX.Element;
}

interface Props {
  header: React.ReactElement;
  headerBackgroundColor?: string;
  labelClose?: string;
  onClose?: () => void;
  onTabSelect?: (event, id: number) => void;
  selectedTab: React.ReactElement;
  selectedTabId?: number;
  tabs?: Array<JSX.Element>;
  width?: number;
}

const Panel = ({
  header,
  tabs = [],
  selectedTabId = 0,
  selectedTab,
  onClose,
  onTabSelect = () => undefined,
  labelClose = 'Close',
  width = 550,
  headerBackgroundColor,
}: Props): JSX.Element => {
  const classes = useStyles({ headerBackgroundColor, width });

  return (
    <Slide
      in
      direction="left"
      timeout={{
        enter: 150,
        exit: 50,
      }}
    >
      <Paper className={classes.container} elevation={2}>
        {header && (
          <>
            <div className={classes.header}>
              {header}
              {onClose && (
                <IconButton
                  ariaLabel={labelClose}
                  title={labelClose}
                  onClick={onClose}
                >
                  <IconClose color="action" />
                </IconButton>
              )}
            </div>
            <Divider className={classes.divider} />
          </>
        )}
        <div className={classes.body}>
          <AppBar color="default" position="static">
            {!isEmpty(tabs) && (
              <Tabs
                indicatorColor="primary"
                textColor="primary"
                value={selectedTabId}
                variant="fullWidth"
                onChange={onTabSelect}
              >
                {tabs.map((tab) => tab)}
              </Tabs>
            )}
          </AppBar>
          <div className={classes.contentContainer}>
            <div className={classes.content}>{selectedTab}</div>
          </div>
        </div>
      </Paper>
    </Slide>
  );
};

export default Panel;
