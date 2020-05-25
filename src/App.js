import React, {useContext} from 'react'
import {withDatastore} from './datastore/withDatastore'
import Dashboard from './components/Dashboard'
import Budgeter from './components/Budgeter'
import Transactions from './components/Transactions'
import SignIn from './components/SignIn'
import {UserContext} from './datastore/auth'
import {Router} from '@reach/router'
import {Container} from '@material-ui/core'
import AppHeader from './components/AppHeader'
import CssBaseline from '@material-ui/core/CssBaseline'


// TODO : Logging
// TODO : front end framework

const App = props => {
  const user = useContext(UserContext)

  return (
    <React.Fragment>
      <CssBaseline />
      <AppHeader/>
      <main>
      <Container maxWidth="md">
        {user ?
          <Router>
            <Dashboard path="/dashboard" />
            <Budgeter path="/budget" />
            <Transactions path="/transactions" />
          </Router>
          :
          <div className="app">
            <Router>
              <SignIn path="/"/>
            </Router>
          </div>
        }
      </Container>
      </main>
    </React.Fragment>
  )
}

export default withDatastore(App)
