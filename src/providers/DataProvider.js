import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserProvider";
import {db} from './firebase';

const DataContext = React.createContext();
const {Provider} = DataContext;

const DataProvider = props => {

    const {current_user} = useContext(UserContext);

    const [collections, setCollections] = useState({
        savingsCollection: null,
        spendingsCollection: null,
        bucketsCollection: null
    });

    useEffect(() => {
        if (current_user) {
            db.collection('users').doc(current_user.uid)
                .set({name: current_user.displayName, email: current_user.email}, {merge: true})
                .catch(err => console.error(err))
            setCollections({
                savingsCollection: db.collection('users').doc(current_user.uid).collection('savings'),
                spendingsCollection: db.collection('users').doc(current_user.uid).collection('spendings'),
                bucketsCollection: db.collection('users').doc(current_user.uid).collection('buckets'),
            })
        }
    }, [current_user]);

    return <Provider value={collections}>{props.children}</Provider>;
};

export {DataProvider, DataContext};