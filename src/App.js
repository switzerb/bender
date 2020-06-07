import React, {useContext} from 'react'
import {withDatastore} from './datastore/withDatastore'
import Dashboard from './components/Dashboard'
import Budgeter from './components/Budgeter'
import Savings from "./components/Savings";
import Spendings from './components/Spendings'
import SignIn from './components/SignIn'
import {UserContext} from './datastore/auth'
import {Router} from '@reach/router'
import {Container} from '@material-ui/core'
import AppHeader from './components/AppHeader'
import CssBaseline from '@material-ui/core/CssBaseline'

// TODO : Logging
// TODO: typescript
// TODO: linting
// TODO: prettier
// TODO : front end framework
// TODO: cronjob or date check so that day 1 of every month you distribute $10 into your fortnight budget

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
            <Dashboard path="/" />
            <Savings path="/savings" />
            <Spendings path="/spending" />
            <Budgeter path="/budget" />
          </Router>
          :
          <div className="app">
              <SignIn />
          </div>
        }
      </Container>
      </main>
    </React.Fragment>
  )
}

export default withDatastore(App)
