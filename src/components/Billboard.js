import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  ButtonGroup,
  Paper,
  Grid,
  Fab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography
} from '@material-ui/core';
import Add from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: 'center'
  },
}));

const Billboard = () => {
  const classes = useStyles();
  return(
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Typography variant="h6">Total Money On {new Date(Date.now()).toLocaleString()}</Typography>
          <Typography variant="h1">$654</Typography>
          <List>
            <ListItem>
              <ListItemText primary="Savings Total - 50%" />
              <ListItemSecondaryAction>
                <Typography variant="h4">$392</Typography>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="Fortnite Total - 10%" />
              <ListItemSecondaryAction>
                <Typography variant="h4">$85</Typography>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <Fab color="secondary" aria-label="add" variant="extended">
            <Add/>
            New Bucket
          </Fab>

        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Typography variant="h6">Future Money</Typography>
          <p>You are earning a 5% interest rate.</p>
          <p>You earn $2 every week.</p>
          <Typography variant="h6">How much will I have in...?</Typography>
          <ButtonGroup size="small" color="secondary" aria-label="outlined primary button group">
            <Button variant="contained">One week</Button>
            <Button>One month</Button>
            <Button>Three months</Button>
            <Button>One year</Button>
          </ButtonGroup>
          <Typography variant="h3">$664</Typography>
          <List>
            <ListItem>
              <ListItemText primary="Savings Total - 50%" />
              <ListItemSecondaryAction>
                <Typography variant="h4">$392</Typography>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="Fortnite Total - 10%" />
              <ListItemSecondaryAction>
                <Typography variant="h4">$85</Typography>
              </ListItemSecondaryAction>
            </ListItem>
          </List>

        </Paper>
      </Grid>
    </Grid>  )
}

export default Billboard;
