import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Transaction from "./Transaction";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const TransactionsTable = ({transactions, onDelete}) => {
    const classes = useStyles();

    return transactions.length ? (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Earned</TableCell>
                        <TableCell>Spent</TableCell>
                        <TableCell>Bucket</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((transaction) => (
                        <Transaction key={transaction.id} transaction={transaction} onDelete={onDelete} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
        : <p>You don't have any transactions to show yet!</p>;
}

export default TransactionsTable;
