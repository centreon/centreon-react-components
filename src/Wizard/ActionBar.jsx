import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

function ActionBar({
  bag: { isSubmitting, isValid },
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
}) {
  const canSubmit = isValid && !isSubmitting;

  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item>
        {onCancel && (
          <Button
            type="button"
            color="primary"
            onClick={(event) => onCancel(event, 'cancel')}
          >
            {labelCancel}
          </Button>
        )}
      </Grid>

      <Grid item>
        {page > 0 && (
          <Button type="button" color="primary" onClick={onPrevious}>
            {labelPrevious}
          </Button>
        )}

        {isLastPage ? (
          <Button
            type="submit"
            color="primary"
            disabled={!canSubmit}
            onClick={onFinish}
          >
            {labelFinish}
          </Button>
        ) : (
          <Button
            type="submit"
            color="primary"
            onClick={onNext}
            disabled={!canSubmit}
          >
            {labelNext}
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

ActionBar.propTypes = {
  bag: PropTypes.shape({
    isSubmitting: PropTypes.bool,
    isValid: PropTypes.bool,
  }).isRequired,
  page: PropTypes.number,
  isLastPage: PropTypes.bool,
  onCancel: PropTypes.func,
  onPrevious: PropTypes.func,
  onNext: PropTypes.func,
  onFinish: PropTypes.func,
  labelCancel: PropTypes.string,
  labelPrevious: PropTypes.string,
  labelNext: PropTypes.string,
  labelFinish: PropTypes.string,
};

ActionBar.defaultProps = {
  page: 0,
  isLastPage: true,
  onCancel: null,
  onPrevious: null,
  onNext: null,
  onFinish: null,
  labelCancel: 'Cancel',
  labelPrevious: 'Previous',
  labelNext: 'Next',
  labelFinish: 'Finish',
};

export default ActionBar;
