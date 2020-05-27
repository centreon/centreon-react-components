import * as React from 'react';

import { Tooltip, makeStyles, IconButton } from '@material-ui/core';
import IconHelp from '@material-ui/icons/HelpOutline';
import IconClose from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[3],
    fontSize: theme.typography.pxToRem(12),
    maxWidth: 500,
    padding: theme.spacing(1, 2, 1, 1),
  },
  buttonClose: {
    position: 'absolute',
    right: theme.spacing(0.5),
  },
}));

interface Props {
  content: React.ReactElement;
  labelSearchHelp: string;
}

const PersistentTooltip = ({
  content,
  labelSearchHelp,
}: Props): JSX.Element => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const toggleTooltip = (): void => {
    setOpen(!open);
  };

  const closeTooltip = (): void => {
    setOpen(false);
  };

  const title = (
    <>
      <IconButton
        size="small"
        onClick={closeTooltip}
        className={classes.buttonClose}
      >
        <IconClose fontSize="small" />
      </IconButton>
      {content}
    </>
  );

  return (
    <Tooltip
      open={open}
      title={title}
      classes={{ tooltip: classes.tooltip }}
      interactive
    >
      <IconButton
        aria-label={labelSearchHelp}
        size="small"
        onClick={toggleTooltip}
      >
        <IconHelp />
      </IconButton>
    </Tooltip>
  );
};

export default PersistentTooltip;
