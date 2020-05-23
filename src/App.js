import React, { useContext } from 'react'
import { withDatastore } from './datastore/withDatastore'
import Dashboard from './components/Dashboard'
import SignIn from './components/SignIn'
import { UserContext } from './datastore/auth'
import { Router } from '@reach/router'

// TODO : Logging
// TODO : front end framework

const App = props => {
  const user = useContext(UserContext);

  return (
    user ?
      <Dashboard/>
      :
      <div className="app">
      <Router>
        <SignIn path="/"/>
      </Router>
    </div>
  )
}

export default withDatastore(App)
