import React from 'react'

const Transactions = ({ transaction, onDelete }) => (
  <div>
    <p>{transaction.name}</p>
    <button
      type="button"
      id={transaction.id}
      onClick={onDelete}
    >
      delete
    </button>
  </div>
)

export default Transactions
