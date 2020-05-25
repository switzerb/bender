import React from 'react'

const Transaction = ({ transaction, onDelete }) => (
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

export default Transaction
