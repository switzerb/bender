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


const AddTransaction = ({open, firebase, onClose}) => {
  const classes = useStyles();
  const { transactionsCollection } = firebase
  const transactionContainer = useRef(null)
  const [transaction, setTransactionInput] = useState('')
  const [transactions, setTransactions] = useState([])

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
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Transaction</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If your money changes, record it here. For adding money,
            put in a positive number, like $5.00.

            When you buy stuff, put in a negative number, like -$5.00.
          </DialogContentText>
          <TextField
            autoFocus
            placeholder="Add a new transaction"
            margin="dense"
            id="transaction"
            label="Add Transaction"
            value={transaction}
            onChange={e => setTransactionInput(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={onTransactionAdd} color="secondary">
            Add Transaction
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default withDatastore(AddTransaction)
