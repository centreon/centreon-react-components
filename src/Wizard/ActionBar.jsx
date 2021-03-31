import React from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  container: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    bottom: 0,
    padding: '0px 10px',
    position: 'sticky',
  },
}));

const ActionBar = ({
  disabledNext,
  page,
  isLastPage,
  onCancel,
  onPrevious,
  onNext,
  onFinish,
  labelCancel,
  labelPrevious,
  labelNext,
  labelFinish,
}) => {
  const classes = useStyles();

  const preventEnterKey = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      className={classes.container}
      direction="row"
      justify="space-between"
    >
      <Grid item>
        {onCancel && (
          <Button
            color="primary"
            type="button"
            onClick={(event) => onCancel(event, 'cancel')}
            onKeyPress={preventEnterKey}
          >
            {labelCancel}
          </Button>
        )}
      </Grid>

      <Grid item>
        {page > 0 && (
          <Button
            color="primary"
            type="button"
            onClick={onPrevious}
            onKeyPress={preventEnterKey}
          >
            {labelPrevious}
          </Button>
        )}

        {isLastPage ? (
          <Button
            color="primary"
            disabled={disabledNext}
            type="submit"
            onClick={onFinish}
            onKeyPress={preventEnterKey}
          >
            {labelFinish}
          </Button>
        ) : (
          <Button
            color="primary"
            disabled={disabledNext}
            type="submit"
            onClick={onNext}
            onKeyPress={preventEnterKey}
          >
            {labelNext}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

ActionBar.propTypes = {
  disabledNext: PropTypes.bool,
  isLastPage: PropTypes.bool,
  labelCancel: PropTypes.string,
  labelFinish: PropTypes.string,
  labelNext: PropTypes.string,
  labelPrevious: PropTypes.string,
  onCancel: PropTypes.func,
  onFinish: PropTypes.func,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  page: PropTypes.number,
};

ActionBar.defaultProps = {
  disabledNext: false,
  isLastPage: true,
  labelCancel: 'Cancel',
  labelFinish: 'Finish',
  labelNext: 'Next',
  labelPrevious: 'Previous',
  onCancel: null,
  onFinish: null,
  onNext: null,
  onPrevious: null,
  page: 0,
};

export default ActionBar;
