import React from 'react'
import {
    IconButton,
    TableRow,
    TableCell,
} from "@material-ui/core";
import {
    Delete
} from "@material-ui/icons";
import {withDatastore} from "../datastore/withDatastore"
import NumberFormat from 'react-number-format'
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    root: {},
    outflow: {
        color: 'red'
    },
    inflow: {}
}))

const Transaction = ({ transaction, ...props }) => {
    const classes = useStyles();
    const { transactionsCollection } = props.firebase

    const onTransactionDelete = id => {
        transactionsCollection
            .doc(id)
            .delete()
            .catch((e) =>{
                console.log(e)
            })
    }

    return (
        <TableRow key={transaction.id}>
            <TableCell>{transaction.date.toLocaleString()}</TableCell>
            <TableCell component="th" scope="row">
                {transaction.description}
            </TableCell>
            <TableCell className={classes.inflow}>{transaction.inflow > 0 ? <NumberFormat value={transaction.inflow} displayType={'text'} thousandSeparator={true} prefix={'$'} /> : ''}</TableCell>
            <TableCell className={classes.outflow}>{transaction.outflow > 0 ? <NumberFormat value={transaction.outflow} displayType={'text'} thousandSeparator={true} prefix={'- $'} /> : ''}</TableCell>
            <TableCell>{transaction.bucket}</TableCell>
            <TableCell><IconButton onClick={() => onTransactionDelete(transaction.id)}><Delete /></IconButton></TableCell>
        </TableRow>
    )
}

export default withDatastore(Transaction)
