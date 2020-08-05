import * as React from 'react';

import { List, ListItem, Box, makeStyles } from '@material-ui/core';
import ForwardIcon from '@material-ui/icons/ArrowForwardIos';

import ExpandableSection from './ExpandableSection';
import Panel from '..';
import ContentWithCircularLoading from '../../ContentWithCircularProgress';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr auto auto',
    height: '100%',
  },
  closeSecondaryPanelBar: {
    border: `1px solid ${theme.palette.grey[300]}`,
    width: 20,
    cursor: 'pointer',
  },
  closeIcon: {
    width: 15,
    margin: 'auto',
  },
  secondaryPanel: {
    width: (secondaryPanelOpen) => (secondaryPanelOpen ? 500 : 0),
    transition: '.1s ease-in-out',
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
  const [secondaryPanelOpen, setSecondaryPanelOpen] = React.useState(false);
  const classes = useStyles(secondaryPanelOpen);

  React.useEffect(() => {
    setSecondaryPanelOpen(secondaryPanel !== undefined);
  }, [secondaryPanel]);

  const toggleSecondaryPanel = () => {
    if (!secondaryPanel) {
      return;
    }
    setSecondaryPanelOpen(!secondaryPanelOpen);
  };

  const onTransitionEnd = () => {
    if (!setSecondaryPanelOpen) {
      onSecondaryPanelClose();
    }
  };

  return (
    <Panel
      onClose={onClose}
      header={header}
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
            {secondaryPanelOpen && (
              <Box
                className={classes.closeSecondaryPanelBar}
                aria-label="Close Secondary Panel"
                display="flex"
                alignItems="center"
                alignContent="center"
                onClick={toggleSecondaryPanel}
              >
                <ForwardIcon className={classes.closeIcon} />
              </Box>
            )}
            <div
              className={classes.secondaryPanel}
              onTransitionEnd={onTransitionEnd}
            >
              {secondaryPanel}
            </div>
          </div>
        </ContentWithCircularLoading>
      }
    />
  );
};

export default SectionPanel;
