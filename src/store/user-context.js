import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext({
    isLoggedIn: null,
    user: null,
    onLogin: () => {},
    onLogout: () => {},
});

export const UserContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const onLogin = (user) => {
        setIsLoggedIn(true);
        setUser(user);
        navigate("/profile");
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
