import * as React from 'react';

import { isNil } from 'ramda';

import { List, ListItem, makeStyles, Slide, Paper } from '@material-ui/core';
import ForwardIcon from '@material-ui/icons/ArrowForwardIos';

import Panel from '..';
import ContentWithCircularLoading from '../../ContentWithCircularProgress';

import ExpandableSection from './ExpandableSection';

const panelWidth = 550;
const closeSecondaryPanelBarWidth = 20;

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    margin: 'auto',
    width: 15,
  },
  closeSecondaryPanelBar: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    cursor: 'pointer',
    display: 'flex',
  },
  container: {
    display: (hasSecondaryPanel) => (hasSecondaryPanel ? 'grid' : 'block'),
    gridTemplateColumns: (hasSecondaryPanel) => {
      return hasSecondaryPanel
        ? `1fr ${closeSecondaryPanelBarWidth}px 1fr`
        : '100%';
    },
    height: '100%',
  },
  mainPanel: {
    bottom: 0,
    left: 0,
    overflow: 'auto',
    position: (hasSecondaryPanel) => (hasSecondaryPanel ? 'unset' : 'absolute'),
    right: 0,
    top: 0,
    width: panelWidth,
  },
}));

interface Section {
  expandable: boolean;
  id: string;
  section: JSX.Element;
  title?: string;
}

interface Props {
  header: JSX.Element;
  loading?: boolean;
  onClose: () => void;
  onSecondaryPanelClose?: () => void;
  secondaryPanel?: JSX.Element;
  sections: Array<Section>;
}

const SectionPanel = ({
  header,
  secondaryPanel,
  sections,
  onSecondaryPanelClose = () => undefined,
  onClose = () => undefined,
  loading = false,
}: Props): JSX.Element => {
  const hasSecondaryPanel = !isNil(secondaryPanel);

  const classes = useStyles(hasSecondaryPanel);

  const getWidth = (): number => {
    if (hasSecondaryPanel) {
      return panelWidth * 2 + closeSecondaryPanelBarWidth;
    }

    return panelWidth;
  };

  return (
    <Panel
      header={header}
      selectedTab={
        <ContentWithCircularLoading alignCenter loading={loading}>
          <div className={classes.container}>
            <List className={classes.mainPanel}>
              {sections.map(({ id, title, section, expandable }) =>
                expandable ? (
                  <ExpandableSection key={id} title={title as string}>
                    {section}
                  </ExpandableSection>
                ) : (
                  <ListItem key={id}>{section}</ListItem>
                ),
              )}
            </List>

            {hasSecondaryPanel && (
              <Paper
                aria-label="Close Secondary Panel"
                className={classes.closeSecondaryPanelBar}
                onClick={onSecondaryPanelClose}
              >
                <ForwardIcon className={classes.closeIcon} color="action" />
              </Paper>
            )}

            <Slide
              direction="left"
              in={hasSecondaryPanel}
              timeout={{ enter: 150, exit: 50 }}
            >
              <div>{secondaryPanel}</div>
            </Slide>
          </div>
        </ContentWithCircularLoading>
      }
      width={getWidth()}
      onClose={onClose}
    />
  );
};

export default SectionPanel;
