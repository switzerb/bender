import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserProvider";
import firebase from "firebase";

const DataContext = React.createContext();
const {Provider} = DataContext;

const DataProvider = props => {

    const {user} = useContext(UserContext);

    const [db, setDb] = useState({
        savingsCollection: null,
        spendingsCollection: null,
        bucketsCollection: null
    });

    useEffect(() => {
        if (user) {
            // const userId = 'I7CGoEOg2sNgpfuMF8e2m1qFRJP2'
            setDb({
                savingsCollection: firebase.firestore().collection('users').doc(user.id).collection('savings'),
                spendingsCollection: firebase.firestore().collection('users').doc(user.id).collection('spendings'),
                bucketsCollection: firebase.firestore().collection('users').doc(user.id).collection('buckets'),
            })
        }
    }, [user]);

    return <Provider value={db}>{props.children}</Provider>;
};

export {DataProvider, DataContext};