import * as React from 'react';

import { Tooltip, IconButton, Box, Link, makeStyles } from '@material-ui/core';
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

interface ContentProps {
  onClose: (event) => void;
  description: React.ReactElement;
  labelExamples: string;
  examples: Array<React.ReactElement>;
  labelTips: string;
  labelGetRegexHelp: string;
  urlTip: string;
  labelUrlTip: string;
}

const Content = ({
  onClose,
  description,
  labelExamples,
  examples,
  labelTips,
  labelGetRegexHelp,
  urlTip,
  labelUrlTip,
}: ContentProps): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <IconButton
        size="small"
        onClick={onClose}
        className={classes.buttonClose}
      >
        <IconClose fontSize="small" />
      </IconButton>
      <Box padding={1}>
        <div>{description}</div>
        <p>{labelExamples}</p>
        <ul>{examples.map((example) => example)}</ul>
        <i>
          <b>{`${labelTips}: `}</b>
          {`${labelGetRegexHelp} `}
          <Link href={urlTip} target="_blank" rel="noopener noreferrer">
            {labelUrlTip}
          </Link>
        </i>
      </Box>
    </>
  );
};

interface TooltipProps extends ContentProps {
  labelSearchHelp: string;
}

const SearchHelpTooltip = ({
  labelSearchHelp,
  description,
  labelExamples,
  examples,
  labelTips,
  labelGetRegexHelp,
  urlTip,
  labelUrlTip,
}: TooltipProps): JSX.Element => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const toggleTooltip = (): void => {
    setOpen(!open);
  };

  const closeTooltip = (): void => {
    setOpen(false);
  };

  const content = (
    <Content
      onClose={closeTooltip}
      description={description}
      labelExamples={labelExamples}
      examples={examples}
      labelTips={labelTips}
      labelGetRegexHelp={labelGetRegexHelp}
      urlTip={urlTip}
      labelUrlTip={labelUrlTip}
    />
  );

  return (
    <Tooltip
      open={open}
      title={content}
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

export default SearchHelpTooltip;
