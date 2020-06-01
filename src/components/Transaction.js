import React from 'react'
import {
    IconButton,
    TableRow,
    TableCell,
} from "@material-ui/core";
import {
    Delete
} from "@material-ui/icons";
import {withDatastore} from "../datastore/withDatastore";

const Transaction = ({ transaction, ...props }) => {
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
            <TableCell align="right">date here</TableCell>
            <TableCell component="th" scope="row">
                {transaction.name}
            </TableCell>
            <TableCell>$10.00</TableCell>
            <TableCell><IconButton onClick={() => onTransactionDelete(transaction.id)}><Delete /></IconButton></TableCell>
        </TableRow>
    )
}

export default withDatastore(Transaction)
