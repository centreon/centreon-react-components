import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

const ActionButton = styled(Button)({
  color: '#009fdf',
});

function Alert({
  open,
  onCancel,
  onConfirm,
  labelTitle,
  labelMessage,
  labelCancel,
  labelConfirm,
}) {
  return (
    <Dialog open={open}>
      <DialogTitle>{labelTitle}</DialogTitle>
      {labelMessage && (
        <DialogContent>
          <DialogContentText>{labelMessage}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <ActionButton onClick={onCancel}>{labelCancel}</ActionButton>
        <ActionButton onClick={onConfirm} autoFocus>
          {labelConfirm}
        </ActionButton>
      </DialogActions>
    </Dialog>
  );
}

Alert.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  labelTitle: PropTypes.string,
  labelMessage: PropTypes.string,
  labelCancel: PropTypes.string,
  labelConfirm: PropTypes.string,
};

Alert.defaultProps = {
  labelTitle: 'are you sure ?',
  labelMessage: null,
  labelCancel: 'Cancel',
  labelConfirm: 'Confirm',
};

export default Alert;
