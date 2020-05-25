import React from 'react'
import {Paper, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

const Budgeter = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Typography variant="h6">Should I buy that?</Typography>
        How much do you want to spend?
        <input />
      </Paper>

    </React.Fragment>
  )
}

export default Budgeter;
