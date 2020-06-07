import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Slider,
    Typography
} from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

const FutureMoney = ({savings, spending}) => {
    const classes = useStyles();
    const [weeks, setWeeks] = useState(1)

    const handleChange = (event, value) => {
        setWeeks(value)
    }

    return (
        <>
        <Typography variant="h4">Future Money</Typography>
            <p>You earn $10 every week.</p>
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
            </>
    )
}

export default FutureMoney;