import React, {useContext, useEffect, useState} from 'react'
import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    Dialog,
    DialogActions,
    DialogContent,
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
import {DataContext} from "../providers/DataProvider";
import {roundTo} from "../utils/money";

// TODO: Validation on amount
// TODO: helpers on forms

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

const TransactionAdd = ({open, onClose, account}) => {
    const classes = useStyles();
    const {spendingsCollection, savingsCollection, bucketsCollection} = useContext(DataContext)
    const [description, setDescription] = useState('')
    const [type, setType] = useState("in")
    const [buckets, setBuckets] = React.useState([])
    const [bucket, setBucket] = React.useState(null)
    const [inflow, setInflow] = useState(0)
    const [outflow, setOutflow] = useState(0)

    useEffect(() => {
        if (bucketsCollection) {
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
        }
    }, [bucketsCollection])

    const handleChangeType = (event, newType) => {
        setType(newType)
        if (type === "in") {
            setBucket('')
        }
    }

    const onTransactionAdd = event => {
        event.preventDefault()
        if (!description.trim().length) return

        // TODO: Form validation

        let newTransaction = {
            description,
            outflow: roundTo(outflow),
            inflow: roundTo(inflow),
            timestamp: new Date(),
        }
        if(bucket) {
            newTransaction.bucketRef = bucketsCollection.doc(bucket)
        }

        if(account === "spendings") {
            spendingsCollection.add(newTransaction)
        }

        if(account === "savings") {
            savingsCollection.add(newTransaction)
        }
        onClose()
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
                        placeholder={type === "out" ? "Describe what you bought" : "How did you earn money?"}
                        id="description"
                        label="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                    {
                        type === 'in' ?
                            <TextField
                                margin="normal"
                                placeholder="How much?"
                                id="inflow"
                                label="Earned"
                                value={inflow}
                                onChange={e => setInflow(parseFloat(e.target.value))}
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                }}
                            />
                            :
                            <>
                                <TextField
                                    margin="normal"
                                    placeholder="How much?"
                                    id="amount"
                                    label="Spent"
                                    value={outflow}
                                    onChange={e => setOutflow(parseFloat(e.target.value))}
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }}
                                />
                                <FormControl
                                    margin="normal"
                                    className={classes.form}
                                    variant="outlined"
                                >
                                    <InputLabel id="demo-simple-select-label">Bucket</InputLabel>
                                    <Select
                                        fullWidth
                                        value={bucket}
                                        onChange={(e) => setBucket(e.target.value)}
                                    >
                                        {buckets.map(bucket => <MenuItem value={bucket.id}>{bucket.name}</MenuItem>)}
                                    </Select></FormControl>
                            </>
                    }
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
