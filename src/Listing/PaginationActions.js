/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const styles = (theme) => ({
  root: {
    color: theme.palette.text.secondary,
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
});

class PaginationActions extends Component {
  handleFirstPageButtonClick = (event) => {
    const { onChangePage } = this.props;
    onChangePage(event, 0);
  };

  handleBackButtonClick = (event) => {
    const { onChangePage, page } = this.props;
    onChangePage(event, page - 1);
  };

  handleNextButtonClick = (event) => {
    const { onChangePage, page } = this.props;
    onChangePage(event, page + 1);
  };

  handleLastPageButtonClick = (event) => {
    const { count, rowsPerPage, onChangePage } = this.props;
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  render() {
    const { classes, count, page, theme, rowsPerPage } = this.props;
    return (
      <div className={classes.root}>
        <IconButton
          aria-label="First Page"
          disabled={page === 0}
          onClick={this.handleFirstPageButtonClick}
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          aria-label="Previous Page"
          disabled={page === 0}
          onClick={this.handleBackButtonClick}
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          aria-label="Next Page"
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          onClick={this.handleNextButtonClick}
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          aria-label="Last Page"
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          onClick={this.handleLastPageButtonClick}
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

PaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PaginationActions);
