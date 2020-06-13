import React, {useContext, useEffect, useReducer} from 'react'
import FutureMoney from './FutureMoney'
import { makeStyles } from '@material-ui/core/styles'
import {
    Button,
    Paper,
    Grid,
    Fab,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Typography
} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import {
    get_total,
    get_savings,
    get_spendings
} from '../utils/calculations'
import {DataContext} from '../providers/DataProvider'
import RecordAllowance from "./RecordAllowance";
import Billboard from "./Billboard";
import Buckets from "./Buckets";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        textAlign: 'center'
    },
}));

const reducer = (state, action) => {
    switch (action.type) {
        case 'getSavings':
            return {...state, savings: action.payload}
        case 'getSpendings':
            return {...state, spendings: action.payload}
        default:
            throw new Error();
    }
}


const Dashboard = () => {
    const classes = useStyles()
    const [state, dispatch] = useReducer(reducer,{savings: [], spendings: []});
    const {savingsCollection, spendingsCollection, bucketsCollection} = useContext(DataContext)

    useEffect(() => {
        if(savingsCollection) {
            const unsubscribe = savingsCollection
                .onSnapshot(({ docs }) => {
                    const transactions = docs.map( doc => {
                        return doc.data()
                    })
                    dispatch({type: 'getSavings', payload: transactions})
                })

            return () => unsubscribe()
        }
    }, [])

    useEffect(() => {
        if(spendingsCollection) {
            const unsubscribe = spendingsCollection
                .onSnapshot(({ docs }) => {
                    const transactions = docs.map( doc => {
                        return doc.data()
                    })
                    dispatch({type: 'getSpendings', payload: transactions})
                })

            return () => unsubscribe()
        }
    }, [])

    return(
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Billboard/>
                <Buckets/>
            </Grid>
            <Grid item xs={6}>
                <RecordAllowance />
                <FutureMoney savings={get_savings(state.savings)} spending={get_spendings(state.spendings)}/>
            </Grid>
        </Grid>  )
}

export default Dashboard;
