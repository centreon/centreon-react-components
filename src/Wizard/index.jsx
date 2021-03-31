import * as React from 'react';

import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import Stepper from './Stepper';
import ActionBar from './ActionBar';
import Confirm from '../Dialog/Confirm';

const isReactElement = (element) => {
  if (
    element &&
    element.type &&
    ['object', 'function', 'symbol'].includes(typeof element.type)
  ) {
    return true;
  }

  return false;
};

const cloneElement = (element, props) => {
  const forwardedProps = isReactElement(element) ? props : {};

  return React.cloneElement(element, { ...forwardedProps });
};

const FormPage = ({ children, page, validateForm }) => {
  React.useEffect(() => {
    validateForm();
  }, [page]);

  return children;
};

const useWizardStyles = makeStyles((theme) => ({
  dialogContent: {
    backgroundColor: theme.palette.grey[100],
    display: 'flex',
    padding: 0,
  },
  form: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  fullHeight: {
    height: '100%',
  },
}));

const Wizard = (props) => {
  const {
    open,
    onClose,
    initialValues,
    onSubmit,
    width,
    fullHeight,
    actionBarProps,
    exitConfirmProps,
    children,
  } = props;
  const classes = useWizardStyles(props);
  const [page, setPage] = React.useState(0);
  const [values, setValues] = React.useState(initialValues);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [validValues, setValidValues] = React.useState(false);
  const [sendingRequest, setSendingRequest] = React.useState(false);

  React.useEffect(() => {
    const activePage = React.Children.toArray(children)[page];
    const { validationSchema } = activePage.props;
    if (validationSchema) {
      validationSchema.isValid(values).then((isValidSchema) => {
        setValidValues(isValidSchema);
      });
    } else {
      setValidValues(true);
    }
  }, [values]);

  const handleClose = (event, reason) => {
    // close wizard without confirmation if it's the first page
    if (page === 0) {
      onClose('cancel');
    } else {
      setOpenConfirm(true);
      onClose(reason);
    }
  };

  const handleCloseConfirm = (confirm) => {
    setOpenConfirm(false);

    if (confirm === true) {
      onClose('cancel');
    }
  };

  const handleNext = (submittedValues) => {
    setPage(Math.min(page + 1, children.length - 1));
    setValues(submittedValues);
  };

  const handlePrevious = () => {
    setPage(Math.max(page - 1, 0));
  };

  const validate = (currentValues) => {
    const activePage = React.Children.toArray(children)[page];

    return activePage.props.validate
      ? activePage.props.validate(currentValues)
      : {};
  };

  const validationSchema = () => {
    const activePage = React.Children.toArray(children)[page];

    return activePage.props.validationSchema
      ? activePage.props.validationSchema
      : null;
  };

  const handleSubmit = (submittedValues, bag) => {
    const isLastPage = page === React.Children.count(children) - 1;

    if (isLastPage && onSubmit) {
      return onSubmit(submittedValues, bag);
    }

    bag.setTouched({});
    bag.setSubmitting(false);
    handleNext(submittedValues);

    return null;
  };

  const disableNextOnSendingRequests = (sendingRequests) => {
    if (sendingRequests.length === 0) {
      setSendingRequest(false);
    }

    setSendingRequest(sendingRequests.filter((sending) => sending).length > 0);
  };

  const activePage = React.Children.toArray(children)[page];
  const isLastPage = page === React.Children.count(children) - 1;

  return (
    <>
      <Dialog
        fullWidth
        classes={{ paper: fullHeight ? classes.fullHeight : null }}
        maxWidth={width}
        open={open}
        onClose={handleClose}
      >
        {React.Children.count(children) > 1 && (
          <Stepper activeStep={page}>{children}</Stepper>
        )}
        <DialogContent className={classes.dialogContent}>
          <Formik
            enableReinitialize={false}
            initialValues={values}
            validate={validate}
            validationSchema={validationSchema()}
            onSubmit={handleSubmit}
          >
            {(bag) => {
              const disabledNext =
                sendingRequest ||
                !bag.isValid ||
                bag.isSubmitting ||
                (!bag.dirty && !validValues);
              return (
                <Form
                  className={classes.form}
                  onKeyPress={(keyEvent) => {
                    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
                      keyEvent.preventDefault();
                    }
                  }}
                  onSubmit={bag.handleSubmit}
                >
                  <FormPage page={page} validateForm={bag.validateForm}>
                    {cloneElement(activePage, {
                      disableNextOnSendingRequests,
                      errors: bag.errors,
                      handleBlur: bag.handleBlur,
                      handleChange: bag.handleChange,
                      handleSubmit: bag.handleSubmit,
                      onNext: handleNext,
                      onPrevious: handlePrevious,
                      setFieldError: bag.setFieldError,
                      setFieldTouched: bag.setFieldTouched,
                      setFieldValue: bag.setFieldValue,
                      setValues: bag.setValues,
                      submitForm: bag.submitForm,
                      touched: bag.touched,
                      values: bag.values,
                    })}
                  </FormPage>
                  {!activePage.props.noActionBar && (
                    <ActionBar
                      disabledNext={disabledNext}
                      isLastPage={isLastPage}
                      page={page}
                      onPrevious={handlePrevious}
                      {...actionBarProps}
                    />
                  )}
                </Form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
      <Confirm
        open={openConfirm}
        onCancel={() => handleCloseConfirm(false)}
        onConfirm={() => handleCloseConfirm(true)}
        {...exitConfirmProps}
      />
    </>
  );
};

Wizard.propTypes = {
  actionBarProps: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.node.isRequired,
  exitConfirmProps: PropTypes.objectOf(PropTypes.any),
  fullHeight: PropTypes.bool,
  initialValues: PropTypes.objectOf(PropTypes.any),
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool.isRequired,
  width: PropTypes.string,
};

Wizard.defaultProps = {
  actionBarProps: null,
  exitConfirmProps: null,
  fullHeight: false,
  initialValues: {},
  onClose: null,
  onSubmit: null,
  width: 'md',
};

export const Page = ({ children, ...props }) => (
  <Box height="100%" style={{ overflow: 'auto' }}>
    {React.Children.toArray(children).map((child) => {
      return cloneElement(child, props);
    })}
  </Box>
);

Page.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
};

Page.defaultProps = {
  children: null,
  label: null,
};

export default Wizard;
