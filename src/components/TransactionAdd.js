import React, {useEffect, useState} from 'react'
import {
    Button,
    TextField,
    FormControl,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import NumberFormat from 'react-number-format'
import {
    ToggleButton,
    ToggleButtonGroup
} from '@material-ui/lab'
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// TODO: Validation on amount
// TODO: helpers on forms
// TODO: toggle for earn or spend

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

function NumberFormatCustom(props) {
    const {inputRef, onChange, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            allowNegative
            prefix="$"
        />
    );
}

const TransactionAdd = ({open, firebase, onClose}) => {
    const classes = useStyles();
    const {spendingsCollection, bucketsCollection} = firebase
    const [description, setDescription] = useState('')
    const [type, setType] = useState("in")
    const [buckets, setBuckets] = React.useState([])
    const [bucket, setBucket] = React.useState('')
    const [amount, setAmount] = useState('')

    useEffect(() => {
        const unsubscribe = bucketsCollection
            .onSnapshot(({docs}) => {
                const fromDB = docs.map(doc => {
                    const {name} = doc.data()
                    return {
                        id: doc.id,
                        name,
                    }
                })
                setBuckets(fromDB)
            })
        return () => unsubscribe()
    }, [])

    const handleChangeType = (event, newType) => {
        setType(newType)
        if(type === "in") {
            setBucket('')
        }
    }

    const onTransactionAdd = event => {
        event.preventDefault()
        if (!description.trim().length) return

        spendingsCollection.add({
            description,
            amount,
            timestamp: new Date(),
            bucketRef: bucketsCollection.doc('NuFf90h4RPiqSlEHp0RK'), //we need to automatically create a bucket
        })
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} className={classes.root}>
                <DialogTitle id="form-dialog-title">Add New Transaction</DialogTitle>
                <DialogContent>
                    <ToggleButtonGroup
                        value={type}
                        exclusive
                        color="secondary"
                        onChange={handleChangeType}
                    >
                        <ToggleButton value="in">
                            PUT MONEY IN
                        </ToggleButton>
                        <ToggleButton value="out">
                            TAKE MONEY OUT
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <TextField
                        margin="normal"
                        autoFocus
                        placeholder="Describe what you bought"
                        id="description"
                        label="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="normal"
                        placeholder="How much?"
                        id="amount"
                        label="Amount"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                    />
                    {type === "out" ?
                        <FormControl
                        margin="normal"
                            className={classes.form}
                            variant="outlined"
                        >
                            <Select
                                fullWidth
                                value={bucket}
                                onChange={(e) => setBucket(e.target.value)}
                            >
                                {buckets.map(bucket => <MenuItem value={bucket.id}>{bucket.name}</MenuItem>)}
                            </Select></FormControl>
                        : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={onTransactionAdd} color="secondary">
                        Add Transaction
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default TransactionAdd
