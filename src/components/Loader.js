import React from 'react'
import {CircularProgress, Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '60vh'
    },
}));

const Loader = () => {
    const classes = useStyles()
    return (
        <Container maxWidth="sm" className={classes.root}>
            <CircularProgress/>
        </Container>
    )
}

export default Loader