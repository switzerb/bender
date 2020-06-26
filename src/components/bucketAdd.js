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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    form: {
        width: '100%',
    },
    select: {
        padding: theme.spacing(2)
    }
}));

const BucketAdd = ({open, onClose}) => {
    const classes = useStyles();
    const [name, setName] = useState('')
    const [budgeted, setBudgeted] = useState(0)
    const {bucketsCollection} = useContext(DataContext)

    const onBucketAdd = () => {
        if (!name.trim().length) return
        // TODO: Form validation
        let newBucket = {
            name,
            budgeted,
        }
        bucketsCollection.add(newBucket)
        onClose()
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} className={classes.root}>
                <DialogTitle id="form-dialog-title">Add New Budgeting Bucket</DialogTitle>
                <DialogContent>
                    <FormControl
                        margin="normal"
                        className={classes.form}
                        variant="outlined"
                    >
                        <TextField
                            helperText="Describe the bucket"
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            helperText="budget every four weeks"
                            onChange={(e) => setBudgeted(parseInt(e.target.value, 10))}
                            fullWidth
                            variant="outlined"
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => onBucketAdd()}>
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            onClick={onClose}
                        >Cancel
                        </Button>
                    </FormControl>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default BucketAdd;