import React, {useState, useEffect, createContext} from "react";
import {firebase} from './firebase'

import { logout } from "./auth";

const UserContext = createContext();
const { Provider } = UserContext;

const UserProvider = props => {
    const [current_user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(userAuth => {
            setUser(userAuth);
            setLoading(false)
        });
    }, []);

    return <Provider value={{ current_user, loading, logout: () => logout() }}>{props.children}</Provider>;
};

export { UserProvider, UserContext };
