import React, {useState, useEffect, useReducer} from 'react'
import {
    Fab,
    Paper,
    Typography
} from '@material-ui/core'
import {Add} from '@material-ui/icons'
import {makeStyles} from '@material-ui/core/styles'
import AddTransaction from './TransactionAdd'
import TransactionsTable from "./TransactionsTable";

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
        case 'getTransactions':
            return {...state, transactions: action.payload}
        default:
            throw new Error();
    }
}

const Transactions = props => {
    const classes = useStyles();
    const {transactionsCollection} = props.firebase
    const [open, setOpen] = React.useState(false);
    const [state, dispatch] = useReducer(reducer,{transactions: []});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const unsubscribe = transactionsCollection
            .orderBy('timestamp', 'desc')
            .onSnapshot(({docs}) => {
                let temp = [];
                docs.map(doc => {
                    const {description, amount, timestamp, bucketRef} = doc.data()
                    let detail = {
                        id: doc.id,
                        description,
                        amount,
                        date: timestamp.toDate(),
                    }
                    if(bucketRef) {
                        bucketRef.get().then(bucket => {
                            detail.bucket = bucket.data().name
                            temp.push(detail)
                            dispatch({type: 'getTransactions', payload: temp})
                        })
                    } else {
                        temp.push(detail)
                        dispatch({type: 'getTransactions', payload: temp})
                    }
                })
            })
        return () => unsubscribe()
    }, [])

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="h4">Transactions</Typography>
                <Typography variant="h6">This is where you can write down what you earned and what you
                    spent.</Typography>
                <TransactionsTable transactions={state.transactions}/>
                <Fab
                    color="secondary"
                    aria-label="add"
                    className={classes.fab}
                    onClick={handleClickOpen}>
                    <Add/>
                </Fab>
            </Paper>
            <AddTransaction open={open} onClose={handleClose}/>
        </div>
    )
}

export default Transactions
