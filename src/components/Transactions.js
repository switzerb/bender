import React, { useState, useEffect, useRef } from 'react'
import Transaction from './Transaction'
import { withDatastore } from '../datastore/withDatastore'
import {
  Fab,
  Paper,
    TextField,
  Typography
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import AddTransaction from './AddTransaction'
import TransactionsTable from "./TransactionsTable";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    position: 'relative',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));


const Transactions = props => {
  const classes = useStyles();
  const { transactionsCollection } = props.firebase
  const [transactions, setTransactions] = useState([])
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const unsubscribe = transactionsCollection
      .orderBy('timestamp', 'desc')
      .onSnapshot(({ docs }) => {
        const transactionsFromDB = []

        docs.forEach(doc => {
          const details = {
            id: doc.id,
            name: doc.data().transaction,
            timestamp: doc.data().timestamp
          }

          transactionsFromDB.push(details)
        })

        setTransactions(transactionsFromDB)
      })

    return () => unsubscribe()
  }, [])

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h5">Things I Bought</Typography>
          <TransactionsTable transactions={transactions} />
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          onClick={handleClickOpen}>
          <Add />
        </Fab>
      </Paper>
      <AddTransaction open={open} onClose={handleClose}/>
    </div>
  )
}

export default withDatastore(Transactions)
