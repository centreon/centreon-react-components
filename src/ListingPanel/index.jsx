import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  Box,
  makeStyles,
  styled,
  CircularProgress,
} from '@material-ui/core';

import IconClose from '../Icon/IconClose2';
import ExpandableSection from '../PagePanel/ExpandableSection';
import { CloseSecondaryPanelIcon, HeaderContainer } from '../PagePanel';
import SlidePanel from '../ListingPage/SlidePanel';

const Body = styled(Box)({
  height: 'auto',
  overflowY: 'hidden',
});

const MainPanel = styled(Box)({
  width: 540,
  overflowY: 'auto',
});

export const SecondaryPanelBar = styled(Box)({
  border: '1px solid #D6D6D8',
  width: 20,
  cursor: 'pointer',
});

const useStyles = makeStyles((theme) => ({
  secondaryPanel: {
    width: ({ active }) => (active ? 500 : 0),
    transition: '.1s ease-in-out',
    overflow: 'hidden',
    backgroundColor: '#c7c8c9',
    padding: ({ active }) => (active ? 5 : 0),
  },
  loading: {
    width: '100%',
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
}));

const PagePanel = ({
  active,
  Header,
  secondaryPanelComponent,
  onSecondaryPanelClose,
  Sections,
  onClose,
  loading,
}) => {
  const [secondaryPanelActive, setSecondaryPanelActive] = useState(false);
  const classes = useStyles({
    active: secondaryPanelActive,
  });

  useEffect(() => {
    setSecondaryPanelActive(secondaryPanelComponent !== undefined);
  }, [secondaryPanelComponent]);

  const toggleSecondaryPanel = () => {
    if (!secondaryPanelComponent) {
      return;
    }
    setSecondaryPanelActive(!secondaryPanelActive);
  };

  const onTransitionEnd = () => {
    if (!secondaryPanelActive) {
      onSecondaryPanelClose();
    }
  };

  const close = () => {
    setSecondaryPanelActive(false);
    onClose();
  };

  const header = (
    <HeaderContainer display="flex" flexDirection="row">
      <Box flexGrow={1}>{Header}</Box>
      <Box>
        <IconClose
          onClick={close}
          style={{ width: 39, height: 39, padding: 5 }}
        />
      </Box>
    </HeaderContainer>
  );

  return (
    <SlidePanel
      header={header}
      content={
        active && (
          <Body display="flex" flexDirection="row" flexGrow={1}>
            {loading ? (
              <div className={classes.loading}>
                <CircularProgress />
              </div>
            ) : (
              <>
                <MainPanel flexGrow={1}>
                  <List>
                    {Sections.map(({ id, title, Section, expandable }) =>
                      expandable ? (
                        <ExpandableSection key={id} title={title}>
                          {Section}
                        </ExpandableSection>
                      ) : (
                        <ListItem key={id}>{Section}</ListItem>
                      ),
                    )}
                  </List>
                </MainPanel>
                <SecondaryPanelBar
                  aria-label="Close Secondary Panel"
                  display="flex"
                  alignItems="center"
                  alignContent="center"
                  onClick={toggleSecondaryPanel}
                >
                  {secondaryPanelActive && <CloseSecondaryPanelIcon />}
                </SecondaryPanelBar>
                <div
                  className={classes.secondaryPanel}
                  onTransitionEnd={onTransitionEnd}
                >
                  {secondaryPanelComponent}
                </div>
              </>
            )}
          </Body>
        )
      }
    />
  );
};

PagePanel.defaultProps = {
  onClose: () => {},
  onSecondaryPanelClose: () => {},
  secondaryPanelComponent: undefined,
  loading: false,
};

PagePanel.propTypes = {
  active: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  Header: PropTypes.node.isRequired,
  secondaryPanelComponent: PropTypes.node,
  Sections: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onClose: PropTypes.func,
  onSecondaryPanelClose: PropTypes.func,
};

export default PagePanel;
