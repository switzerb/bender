import React from 'react'
import { withDatastore } from '../datastore/withDatastore'
import Billboard from './Billboard'

const Dashboard = props => {
  return (
    <div className="app">
      <Billboard/>
    </div>
  )
}

export default withDatastore(Dashboard)
