import React, {useEffect, useReducer, useContext} from 'react'
import {
    Paper,
    Typography
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import TransactionsTable from "./TransactionsTable";
import {DataContext} from "../providers/DataProvider";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        position: 'relative',
        margin: theme.spacing(2),
        padding: theme.spacing(2, 2, 10)
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const reducer = (state, action) => {
    switch (action.type) {
        case 'getSavings':
            return {...state, savings: action.payload}
        default:
            throw new Error();
    }
}

const Savings = props => {
    const classes = useStyles();
    const {savingsCollection} = useContext(DataContext)
    const [state, dispatch] = useReducer(reducer,{savings: []});

    useEffect(() => {
        if(savingsCollection) {
            const unsubscribe = savingsCollection
                .orderBy('timestamp', 'desc')
                .onSnapshot(({docs}) => {
                    let temp = [];
                    docs.forEach(doc => {
                        const {description, inflow, outflow, timestamp} = doc.data()
                        let detail = {
                            id: doc.id,
                            description,
                            inflow,
                            outflow,
                            date: timestamp.toDate(),
                        }
                        temp.push(detail)
                        dispatch({type: 'getSavings', payload: temp})
                    })
                })
            return () => unsubscribe()
        }
    }, [savingsCollection])

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="h4">Savings</Typography>
                <TransactionsTable transactions={state.savings}/>
            </Paper>
        </div>
    )
}

export default Savings
