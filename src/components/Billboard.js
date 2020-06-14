import React, {useContext, useEffect, useReducer} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography
} from '@material-ui/core'
import {
  get_total,
  get_savings,
    get_spendings
} from '../utils/calculations'
import {DataContext} from '../providers/DataProvider'

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


const Billboard = () => {
  const classes = useStyles()
  const [state, dispatch] = useReducer(reducer,{savings: [], spendings: []});
  const {savingsCollection, spendingsCollection} = useContext(DataContext)

  useEffect(() => {
    if(savingsCollection) {
      const unsubscribe = savingsCollection
          .onSnapshot(({ docs }) => {
            const transactions = docs.map( doc => {
              return doc.data()
            })
            dispatch({type: 'getSavings', payload: transactions})
          })

      return () => unsubscribe()
    }
  }, [savingsCollection])

  useEffect(() => {
    if(spendingsCollection) {
      const unsubscribe = spendingsCollection
          .onSnapshot(({ docs }) => {
            const transactions = docs.map( doc => {
              return doc.data()
            })
            dispatch({type: 'getSpendings', payload: transactions})
          })

      return () => unsubscribe()
    }
  }, [spendingsCollection])

  return(
        <Paper className={classes.paper}>
          <Typography variant="h4">Total Money</Typography>
          <Typography variant="overline">On {new Date(Date.now()).toLocaleString()}</Typography>
          <Typography variant="h1">${get_total(state.savings, state.spendings)}</Typography>
          <List>
            <ListItem>
              <ListItemText primary="Savings Total" />
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
          </List>
        </Paper>
  )
}

export default Billboard;
