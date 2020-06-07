import React, {useEffect, useReducer, useState} from 'react'
import { withDatastore } from '../datastore/withDatastore'
import FutureMoney from './FutureMoney'
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
import {
  get_total,
  get_savings,
    get_spendings
} from '../utils/calculations'

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

const reducer = (state, action) => {
  switch (action.type) {
    case 'getSavings':
      return {...state, savings: action.payload}
    case 'getSpendings':
      return {...state, spendings: action.payload}
    default:
      throw new Error();
  }
}


const Billboard = ({firebase}) => {
  const classes = useStyles()
  const {
    bucketsCollection,
    savingsCollection,
    spendingsCollection
  } = firebase
  const [amounts, setAmounts] = useState([])
  const [state, dispatch] = useReducer(reducer,{savings: [], spendings: []});


  useEffect(() => {
    const unsubscribe = savingsCollection
        .onSnapshot(({ docs }) => {
          const transactions = docs.map( doc => {
            return doc.data()
          })
          dispatch({type: 'getSavings', payload: transactions})
        })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const unsubscribe = spendingsCollection
        .onSnapshot(({ docs }) => {
          const transactions = docs.map( doc => {
            return doc.data()
          })
          dispatch({type: 'getSpendings', payload: transactions})
        })

    return () => unsubscribe()
  }, [])

  const recordAllowance = () => {
    // TODO: Make sure that they can only hit the button once a week!
    savingsCollection.add({
      description: "Weekly Allowance",
      inflow: 5.00,
      outflow: 0,
      timestamp: new Date()
    })

    spendingsCollection.add({
      description: "Weekly Allowance",
      inflow: 5.00,
      outflow: 0,
      timestamp: new Date(),
      bucketRef: bucketsCollection.doc('iVkMAT9ZJJOkf9OrhIfw'), //default "whatever" bucket
    })
  }

  return(
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Typography variant="h6">Total Money On {new Date(Date.now()).toLocaleString()}</Typography>
          <Typography variant="h1">${get_total(state.savings, state.spendings)}</Typography>
          <List>
            <ListItem>
              <ListItemText primary="Savings Total - 50%" />
              <ListItemSecondaryAction>
                <Typography variant="h4">${get_savings(state.savings)}</Typography>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="Spendable Total" />
              <ListItemSecondaryAction>
                <Typography variant="h4">${get_spendings(state.spendings)}</Typography>
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
              <ListItemText primary="Fortnite Left This Month" />
              <ListItemSecondaryAction>
                {/* every month you put $10 into your fortnight budget */}
                <Typography variant="h4">$0</Typography>
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
          <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={recordAllowance}>
            Record Weekly Allowance
          </Button>
          <FutureMoney savings={get_savings(state.savings)} spending={get_spendings(state.spendings)}/>
        </Paper>
      </Grid>
    </Grid>  )
}

export default withDatastore(Billboard);
