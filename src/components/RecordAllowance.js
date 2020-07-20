import React, {useContext, useState} from "react";
import {DataContext} from "../providers/DataProvider";
import {
    Button,
    Paper
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {latest_allowance_record} from "../utils/calculations";
import { startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        textAlign: 'center'
    },
}));

const RecordAllowance = ({spendings}) => {
    const classes = useStyles();
    const {savingsCollection, spendingsCollection} = useContext(DataContext);

    const alreadyRecorded = () => {
        const start = startOfWeek(Date.now())
        const end = endOfWeek(Date.now())
        const latest = latest_allowance_record(spendings)
        return isWithinInterval(latest, {start, end})
    }

    const recordAllowance = () => {

        if(!alreadyRecorded()) {
            // savingsCollection.add({
            //     description: "Weekly Allowance",
            //     inflow: 5.00,
            //     outflow: 0,
            //     timestamp: new Date()
            // })
            //
            // spendingsCollection.add({
            //     description: "Weekly Allowance",
            //     inflow: 5.00,
            //     outflow: 0,
            //     timestamp: new Date()
            // })
        }
    }

    return (
        <Paper className={classes.paper}>
            <Button
                disabled={alreadyRecorded()}
                variant="contained"
                color="secondary"
                size="large"
                onClick={recordAllowance}>
                {alreadyRecorded() ? "Allowance Recorded!" :  "Record Weekly Allowance"}
            </Button>
        </Paper>
    )
}

export default RecordAllowance