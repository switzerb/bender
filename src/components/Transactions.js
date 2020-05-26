import React, { useState, useEffect, useRef } from 'react'
import Transaction from './Transaction'
import { withDatastore } from '../datastore/withDatastore'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Paper,
  Typography
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import AddTransaction from './AddTransaction'

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
  const transactionContainer = useRef(null)
  const [transaction, setTransactionInput] = useState('')
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

  const onTransactionDelete = event => {
    const { id } = event.target
    transactionsCollection.doc(id).delete()
  }

  const onTransactionAdd = event => {
    event.preventDefault()

    if (!transaction.trim().length) return

    setTransactionInput('')
    transactionContainer.current.scrollTop = 0 // scroll to top of container

    transactionsCollection.add({
      transaction,
      timestamp: new Date()
    })
  }

  const renderTransactions = () => {
    if (!transactions.length)
      return <h2>You don't have any transactions</h2>

    return transactions.map(transaction => (
      <Transaction key={transaction.id} transaction={transaction} onDelete={onTransactionDelete} />
    ))
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h5">Things I Bought</Typography>
        <section ref={transactionContainer}>
          {renderTransactions()}
        </section>

        <form onSubmit={onTransactionAdd}>
          <input
            type="text"
            placeholder="Add a new transaction"
            value={transaction}
            onChange={e => setTransactionInput(e.target.value)}
          />
        </form>
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
