import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LibraryAdd from '@material-ui/icons/LibraryAdd';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#009fdf',
    cursor: 'pointer',
  },
  iconLabel: {
    color: '#009fdf',
    fontSize: 12, 
    display: 'inline-block',
    verticalAlign: 'super',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 'bold',
    cursor: 'pointer',
    paddingLeft: 5,
  },
  iconWrap: {
    display: 'inline-block',
    verticalAlign: 'middle',
  }
}));

function IconLibraryAdd({label, customStyle, ...rest}) {
  const classes = useStyles();

  return (
    <span {...rest} className={classes.iconWrap}>
      <LibraryAdd style={customStyle} className={classes.icon} />
      {label && <span className={classes.iconLabel}>{label}</span>}
    </span>
  );
}

export default IconLibraryAdd;
