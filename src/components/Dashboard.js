import React, { useState, useEffect, useRef, useContext } from 'react'
import Transactions from './Transactions'
import { withDatastore } from '../datastore/withDatastore'
import { UserContext } from "../datastore/auth";
import { auth } from '../datastore'

const Dashboard = props => {
  const user = useContext(UserContext);
  const {photoURL, displayName, email} = user;

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
      <Transactions key={transaction.id} transaction={transaction} onDelete={onTransactionDelete} />
    ))
  }

  return (
    <div className="app">
      <h2>{displayName}</h2>
      <h3>{email}</h3>
      <button className = "w-full py-3 bg-red-600 mt-4 text-white" onClick = {() => {auth.signOut()}}>Sign out</button>

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
    </div>
  )
}

export default withDatastore(Dashboard)
