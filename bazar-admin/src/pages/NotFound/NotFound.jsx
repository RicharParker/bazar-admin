import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    marginTop: theme.spacing(10),
  },
}));

function NotFound() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1">404</Typography>
      <Typography variant="h4">Page not found</Typography>
    </div>
  );
}

export default NotFound;