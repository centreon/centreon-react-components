import * as React from 'react';

import { List, ListItem, makeStyles, Slide, Paper } from '@material-ui/core';
import ForwardIcon from '@material-ui/icons/ArrowForwardIos';

import ExpandableSection from './ExpandableSection';
import Panel from '..';
import ContentWithCircularLoading from '../../ContentWithCircularProgress';

const panelWidth = 550;
const closeSecondaryPanelBarWidth = 20;

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: (hasSecondaryPanel) =>
      hasSecondaryPanel ? `1fr ${closeSecondaryPanelBarWidth}px 1fr` : `100%`,
    height: '100%',
  },
  closeSecondaryPanelBar: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: theme.palette.background.default,
  },
  closeIcon: {
    width: 15,
    margin: 'auto',
  },
  secondaryPanel: {
    overflow: 'hidden',
  },
}));

interface Section {
  id: string;
  expandable: boolean;
  title?: string;
  section: JSX.Element;
}

interface Props {
  header: JSX.Element;
  sections: Array<Section>;
  onClose: () => void;
  secondaryPanel?: JSX.Element;
  onSecondaryPanelClose?: () => void;
  loading?: boolean;
}

const SectionPanel = ({
  header,
  secondaryPanel,
  sections,
  onSecondaryPanelClose = () => undefined,
  onClose = () => undefined,
  loading = false,
}: Props): JSX.Element => {
  const hasSecondaryPanel = secondaryPanel !== undefined;

  const classes = useStyles(hasSecondaryPanel);

  const getWidth = (): number => {
    if (hasSecondaryPanel) {
      return panelWidth * 2 + closeSecondaryPanelBarWidth;
    }

    return panelWidth;
  };

  return (
    <Panel
      onClose={onClose}
      header={header}
      width={getWidth()}
      selectedTab={
        <ContentWithCircularLoading alignCenter loading={loading}>
          <div className={classes.container}>
            <List>
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

            <Paper
              className={classes.closeSecondaryPanelBar}
              aria-label="Close Secondary Panel"
              onClick={onSecondaryPanelClose}
            >
              <ForwardIcon className={classes.closeIcon} color="action" />
            </Paper>

            <Slide
              in={hasSecondaryPanel}
              direction="left"
              timeout={{ enter: 150, exit: 50 }}
            >
              <div className={classes.secondaryPanel}>{secondaryPanel}</div>
            </Slide>
          </div>
        </ContentWithCircularLoading>
      }
    />
  );
};

export default SectionPanel;
