import React, {useState, useEffect, createContext} from "react";
import {
    auth,
    logout
} from "./auth";


const UserContext = React.createContext();
const { Provider } = UserContext;

const UserProvider = props => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser({ user: userAuth});
        });
    }, []);

    return <Provider value={{ user, logout: () => logout() }}>{props.children}</Provider>;
};

export { UserProvider, UserContext };
