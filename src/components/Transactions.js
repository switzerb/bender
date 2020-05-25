import React, { useState, useEffect, useRef } from 'react'
import Transaction from './Transaction'
import { withDatastore } from '../datastore/withDatastore'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));


const Transactions = props => {
  const classes = useStyles();
  const { transactionsCollection } = props.firebase
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
          <button type="submit">
            Add transaction
          </button>
        </form>
      </Paper>
    </div>
  )
}

export default withDatastore(Transactions)
