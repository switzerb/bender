import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {DatastoreContext, Firebase} from './datastore'
import UserProvider from './datastore/auth'
import {ThemeProvider} from '@material-ui/core/styles'
import * as serviceWorker from './serviceWorker'
import theme from './theme'
import {
    createHistory,
    LocationProvider
} from '@reach/router'

let history = createHistory(window)

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <DatastoreContext.Provider value={new Firebase()}>
                <ThemeProvider theme={theme}>
                    <LocationProvider history={history}>
                        <App/>
                    </LocationProvider>
                </ThemeProvider>
            </DatastoreContext.Provider>,
        </UserProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
