import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import Stepper from './Stepper';
import ActionBar from './ActionBar';
import Alert from './Alert';

function isReactElement(element) {
  if (
    element &&
    element.type &&
    ['object', 'function', 'symbol'].includes(typeof element.type)
  ) {
    return true;
  }

  return false;
}

function cloneElement(element, props) {
  const forwardedProps = isReactElement(element) ? props : {};

  return React.cloneElement(element, { ...forwardedProps });
}

const useWizardStyles = makeStyles({
  fullHeight: {
    height: '100%',
  },
  dialogContent: {
    display: 'flex',
    backgroundColor: '#efeeee',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
});

function Wizard(props) {
  const {
    open,
    onClose,
    initialValues,
    onSubmit,
    width,
    fullHeight,
    actionBarProps,
    exitAlertProps,
    children,
  } = props;
  const classes = useWizardStyles(props);
  const [page, setPage] = useState(0);
  const [values, setValues] = useState(initialValues);
  const [openAlert, setOpenAlert] = useState(false);

  const handleClose = (event, reason) => {
    // close wizard without confirmation if it's the first page
    if (page === 0) {
      onClose('cancel');
    } else {
      setOpenAlert(true);
      onClose(reason);
    }
  };

  const handleCloseAlert = (confirm) => {
    setOpenAlert(false);

    if (confirm === true) {
      onClose('cancel');
    }
  };

  const next = () => {
    setPage(Math.min(page + 1, children.length - 1));
    setValues(values);
  };

  const previous = () => {
    setPage(Math.max(page - 1, 0));
  };

  const validate = () => {
    const activePage = React.Children.toArray(children)[page];

    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  const handleSubmit = (submittedValues, bag) => {
    const isLastPage = page === React.Children.count(children) - 1;

    if (isLastPage && onSubmit) {
      return onSubmit(submittedValues, bag);
    }

    bag.setTouched({});
    bag.setSubmitting(false);
    next(submittedValues);

    return null;
  };

  const activePage = React.Children.toArray(children)[page];
  const isLastPage = page === React.Children.count(children) - 1;

  return (
    <>
      <Dialog
        classes={{ paper: fullHeight ? classes.fullHeight : null }}
        maxWidth={width}
        fullWidth
        open={open}
        onClose={handleClose}
      >
        <Stepper activeStep={page}>{children}</Stepper>
        <DialogContent className={classes.dialogContent}>
          <Formik
            initialValues={values}
            enableReinitialize={false}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({
              handleSubmit: handleFormSubmit,
              isSubmitting,
              setFieldValue,
              submitForm,
            }) => (
              <form className={classes.form} onSubmit={handleFormSubmit}>
                {cloneElement(activePage, {
                  onPrevious: previous,
                  onNext: next,
                  values,
                  setFieldValueAction: setFieldValue,
                  submitFormAction: submitForm,
                })}
                {!activePage.props.noActionBar && (
                  <ActionBar
                    page={page}
                    isLastPage={isLastPage}
                    isSubmitting={isSubmitting}
                    onPrevious={previous}
                    {...actionBarProps}
                  />
                )}
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <Alert
        open={openAlert}
        onCancel={() => handleCloseAlert(false)}
        onConfirm={() => handleCloseAlert(true)}
        {...exitAlertProps}
      />
    </>
  );
}

Wizard.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  initialValues: PropTypes.objectOf(PropTypes.object),
  onSubmit: PropTypes.func,
  width: PropTypes.string,
  fullHeight: PropTypes.bool,
  actionBarProps: PropTypes.objectOf(PropTypes.object),
  exitAlertProps: PropTypes.objectOf(PropTypes.object),
  children: PropTypes.node.isRequired,
};

Wizard.defaultProps = {
  onClose: null,
  initialValues: {},
  onSubmit: null,
  fullHeight: false,
  width: 'md',
  actionBarProps: null,
  exitAlertProps: null,
};

export const Page = ({ children, ...props }) => (
  <Box flex={1}>
    {React.Children.toArray(children).map((child) => {
      return cloneElement(child, props);
    })}
  </Box>
);

Page.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};

Page.defaultProps = {
  label: null,
  children: null,
};

export default Wizard;
