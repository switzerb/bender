import React, {useContext} from 'react'
import {
    Fab,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    Paper,
    Typography
} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import {makeStyles} from "@material-ui/core/styles";
import {DataContext} from "../providers/DataProvider";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2, 2, 4),
        textAlign: 'center'
    },
    table: {
        marginBottom: theme.spacing(2)
    }
}));

const Buckets = () => {
    const classes = useStyles()
    const {bucketsCollection} = useContext(DataContext)

    return (
        <Paper className={classes.paper}>
            <Typography variant="h4">Buckets</Typography>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow component="th">
                        <TableCell>Bucket Name</TableCell>
                        <TableCell>Budgeted</TableCell>
                        <TableCell>Spent</TableCell>
                        <TableCell>Left</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Fortnight V-Bucks
                            </TableCell>
                            <TableCell align="right">$10 / month</TableCell>
                            <TableCell align="right">$10</TableCell>
                            <TableCell align="right">$0</TableCell>
                        </TableRow>
                </TableBody>
            </Table>
            <Fab color="secondary" aria-label="add" variant="extended">
                <Add/>
                New Monthly Bucket
            </Fab>
        </Paper>

    )
}

export default Buckets;