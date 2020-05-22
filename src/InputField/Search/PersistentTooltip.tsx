import * as React from 'react';
import { ifElse, always, isNil } from 'ramda';

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
  description: React.ReactElement | null;
  labelExamples: React.ReactElement | null;
  examples: React.ReactElement | null;
  tips: React.ReactElement | null;
}

const Content = ({
  onClose,
  description,
  labelExamples,
  examples,
  tips,
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
        {description}
        {labelExamples}
        {examples}
        {tips}
      </Box>
    </>
  );
};

interface TooltipProps {
  description?: React.ReactElement;
  labelExamples?: string;
  examples?: Array<React.ReactElement>;
  labelTips?: string;
  labelGetHelp?: string;
  urlTip?: string;
  labelUrlTip?: string;
  labelSearchHelp: string;
}

const PersistentTooltip = ({
  labelSearchHelp,
  description,
  labelExamples,
  examples,
  labelTips,
  labelGetHelp,
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

  const displayElement = (element): ((prop) => React.ReactElement | null) =>
    ifElse(isNil, always(null), always(element));

  const content = (
    <Content
      onClose={closeTooltip}
      description={displayElement(<div>{description}</div>)(description)}
      labelExamples={displayElement(<p>{labelExamples}</p>)(labelExamples)}
      examples={displayElement(<ul>{examples?.map((example) => example)}</ul>)(
        examples,
      )}
      tips={displayElement(
        <i>
          <b>{`${labelTips}: `}</b>
          {`${labelGetHelp} `}
          <Link href={urlTip} target="_blank" rel="noopener noreferrer">
            {labelUrlTip}
          </Link>
        </i>,
      )(labelTips && labelGetHelp && urlTip && labelUrlTip)}
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

export default PersistentTooltip;
