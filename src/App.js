import React, {useContext} from 'react'
import Dashboard from './components/Dashboard'
import Budgeter from './components/Budgeter'
import Savings from './components/Savings'
import Spendings from './components/Spendings'
import SignIn from './components/SignIn'
import Loader from './components/Loader'
import {UserContext} from './providers/UserProvider'
import {Router} from '@reach/router'
import {Container} from '@material-ui/core'
import AppHeader from './components/AppHeader'
import CssBaseline from '@material-ui/core/CssBaseline'
import {makeStyles} from "@material-ui/core/styles";

// TODO: Date Math
// TODO: Logging
// TODO: typescript
// TODO: linting
// TODO: prettier
// TODO: cronjob or date check so that day 1 of every month you distribute $10 into your fortnight budget

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
}));


const App = () => {
    const classes = useStyles();
    const {current_user, loading} = useContext(UserContext)

    const renderStuff = () => {
        return current_user ?
            <Router>
                <Dashboard path="/"/>
                <Savings path="/savings"/>
                <Spendings path="/spending"/>
                <Budgeter path="/budget"/>
            </Router>
            :
            <div className="app">
                <SignIn/>
            </div>
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <AppHeader/>
            <Container maxWidth="lg" className={classes.root}>
                {loading ? <Loader/> : renderStuff() }
            </Container>
        </React.Fragment>
    )
}

export default App
