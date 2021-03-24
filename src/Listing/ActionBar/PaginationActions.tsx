import React from 'react';

import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { TablePaginationActionsProps } from '@material-ui/core/TablePagination/TablePaginationActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
}));

const PaginationActions = ({
  onChangePage,
  page,
  rowsPerPage,
  count,
}: TablePaginationActionsProps): JSX.Element => {
  const classes = useStyles();

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const lastPage = Math.ceil(count / rowsPerPage) - 1;

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, lastPage));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="First Page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="Previous Page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= lastPage}
        aria-label="Next Page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= lastPage}
        aria-label="Last Page"
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
};

export default PaginationActions;
