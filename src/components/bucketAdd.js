import React, {useContext, useState} from 'react'
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField
} from "@material-ui/core";
import {DataContext} from "../providers/DataProvider";
import {makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import {roundTo} from "../utils/money";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    form: {
        width: '100%',
    },
    select: {
        padding: theme.spacing(2)
    },
    btn: {
        margin: theme.spacing(2, 1)
    },
    textfield: {
        margin: theme.spacing(1, 0)
    }
}));

const BucketAdd = ({open, onClose}) => {
    const classes = useStyles();
    const [name, setName] = useState('')
    const [err_name, setErrName] = useState(false)
    const [err_budgeted, setErrBudgeted] = useState(false)
    const [budgeted, setBudgeted] = useState('')
    const {bucketsCollection} = useContext(DataContext)

    const invalidName = (name) => {
        if(!name.trim().length) {
            setErrName(true)
            return true
        }
        setErrName(false)
        return false
    }

    const invalidBudget = (budgeted) => {
        if (isNaN(budgeted)) {
            setErrBudgeted(true)
            return true
        }
        setErrBudgeted(false)
        return false
    }

    const onBucketAdd = () => {
        if (invalidName(name)) return
        if (invalidBudget(budgeted)) return

        let newBucket = {
            name,
            budgeted: roundTo(budgeted),
        }
        bucketsCollection.add(newBucket)
        onClose()
    }

    return (
        <>
            <Dialog
                fullWidth
                open={open}
                onClose={onClose}
                className={classes.root}
            >
                <DialogTitle id="form-dialog-title">Add New Budgeting Bucket</DialogTitle>
                <DialogContent>
                    <FormControl
                        className={classes.form}
                        variant="outlined"
                    >
                        <TextField
                            className={classes.textfield}
                            label="Bucket Name"
                            error={err_name}
                            helperText={err_name ? "Name can't be empty" : "Describe the bucket"}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            className={classes.textfield}
                            label="How Much?"
                            error={err_budgeted}
                            helperText={err_budgeted ? 'Must be a number' : 'budget every four weeks'}
                            onChange={(e) => setBudgeted(e.target.value)}
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                    </FormControl>
                    <Button
                        className={classes.btn}
                        variant="contained"
                        color="secondary"
                        onClick={() => onBucketAdd()}>
                        Save
                    </Button>
                    <Button
                        className={classes.btn}
                        variant="contained"
                        onClick={onClose}
                    >Cancel
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default BucketAdd;