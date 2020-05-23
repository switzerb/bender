import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {DatastoreContext, Firebase} from './datastore'
import UserProvider from './datastore/auth'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <DatastoreContext.Provider value={new Firebase()}>
      <UserProvider>
        <App/>
      </UserProvider>
    </DatastoreContext.Provider>,
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
