import React, {useContext} from 'react'
import {
    IconButton,
    TableRow,
    TableCell,
} from "@material-ui/core";
import {
    Delete
} from "@material-ui/icons";
import NumberFormat from 'react-number-format'
import {makeStyles} from "@material-ui/core/styles"
import {DataContext} from "../providers/DataProvider";

const useStyles = makeStyles((theme) => ({
    root: {},
    outflow: {
        color: 'red'
    },
    inflow: {}
}))

const Transaction = ({ transaction, type }) => {
    const classes = useStyles();
    const {spendingsCollection, savingsCollection} = useContext(DataContext)

    const onTransactionDelete = id => {
        if(type === "spendings") {
            spendingsCollection
                .doc(id)
                .delete()
                .catch((e) =>{
                    console.log(e)
                })
        }
        if(type === "savings") {
            savingsCollection
                .doc(id)
                .delete()
                .catch((e) =>{
                    console.log(e)
                })
        }
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

export default Transaction
