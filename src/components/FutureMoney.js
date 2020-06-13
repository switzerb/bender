import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Slider,
    Typography
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        textAlign: 'center'
    },
}));

const FutureMoney = ({savings, spending}) => {
    const classes = useStyles();
    const [weeks, setWeeks] = useState(1)

    const handleChange = (event, value) => {
        setWeeks(value)
    }

    return (
        <Paper className={classes.paper}>
        <Typography variant="h4">Future Money</Typography>
            <p>You earn $10 every week, $5 to save, $5 to spend.</p>
            <Typography variant="h6">How much will I have in...?</Typography>
            <Slider
                onChange={handleChange}
                defaultValue={1}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={48}
            />
            <Typography variant="h4">In Savings: {savings + (weeks * 5)}</Typography>
            <Typography variant="h4">In Spending: {spending + (weeks * 5)}</Typography>
            <Typography variant="h4">Total: {spending + savings + (weeks * 10)}</Typography>
        </Paper>
    )
}

export default FutureMoney;