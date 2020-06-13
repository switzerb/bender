import React, {useContext} from "react";
import {DataContext} from "../providers/DataProvider";
import {
    Button,
    Paper
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        textAlign: 'center'
    },
}));

const RecordAllowance = () => {
    const classes = useStyles()
    const {savingsCollection, spendingsCollection} = useContext(DataContext)

    const recordAllowance = () => {
        // TODO: Make sure that they can only hit the button once a week!
        savingsCollection.add({
            description: "Weekly Allowance",
            inflow: 5.00,
            outflow: 0,
            timestamp: new Date()
        })

        spendingsCollection.add({
            description: "Weekly Allowance",
            inflow: 5.00,
            outflow: 0,
            timestamp: new Date()
        })
    }

    return (
        <Paper className={classes.paper}>
            <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={recordAllowance}>
                Record Weekly Allowance
            </Button>
        </Paper>
    )
}

export default RecordAllowance