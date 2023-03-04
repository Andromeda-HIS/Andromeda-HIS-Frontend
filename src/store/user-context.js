import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext({
    isLoggedIn: null,
    user: null,
    currentTab: null,
    onLogin: () => {},
    onLogout: () => {},
    onChangeTab: () => {}
});

export const UserContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/profile/account");
        }
    }, [user]);

    const onLogin = (user) => {
        setIsLoggedIn(true);
        setUser(user);
    };

    const onLogout = () => {
        setUser(null);
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <UserContext.Provider
            value={{
                isLoggedIn,
                user,
                onLogin,
                onLogout,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;
