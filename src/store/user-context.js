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

    const setBaseColors = () => {
        document.documentElement.style.setProperty('--color-primary', '#eb2f64');
        document.documentElement.style.setProperty('--color-primary-light', '#ff3366');
        document.documentElement.style.setProperty('--color-primary-dark', '#ba265d');

        document.documentElement.style.setProperty('--color-primary-translucent', '#eb2f64cc');
        document.documentElement.style.setProperty('--color-primary-light-translucent', '#ff3366cc');
        document.documentElement.style.setProperty('--color-primary-dark-translucent', '#ba265dcc');
    };

    const setReceptionistColors = () => {
        document.documentElement.style.setProperty('--color-primary', '#e89a1a');
        document.documentElement.style.setProperty('--color-primary-light', '#ffb900');
        document.documentElement.style.setProperty('--color-primary-dark', '#ff7730');

        document.documentElement.style.setProperty('--color-primary-translucent', '#e89a1acc');
        document.documentElement.style.setProperty('--color-primary-light-translucent', '#ffb900cc');
        document.documentElement.style.setProperty('--color-primary-dark-translucent', '#ff7730cc');
    };

    const setClerkColors = () => {
        document.documentElement.style.setProperty('--color-primary', '#55c57a');
        document.documentElement.style.setProperty('--color-primary-light', '#7ed56f');
        document.documentElement.style.setProperty('--color-primary-dark', '#28b485');

        document.documentElement.style.setProperty('--color-primary-translucent', '#55c57acc');
        document.documentElement.style.setProperty('--color-primary-light-translucent', '#7ed56fcc');
        document.documentElement.style.setProperty('--color-primary-dark-translucent', '#28b485cc');
    };

    const setDoctorColors = () => {
        document.documentElement.style.setProperty('--color-primary', '#3f6dfc');
        document.documentElement.style.setProperty('--color-primary-light', '#2998ff');
        document.documentElement.style.setProperty('--color-primary-dark', '#5643fa');

        document.documentElement.style.setProperty('--color-primary-translucent', '#3f6dfccc');
        document.documentElement.style.setProperty('--color-primary-light-translucent', '#2998ffcc');
        document.documentElement.style.setProperty('--color-primary-dark-translucent', '#5643facc');
    };

    const setAdminColors = () => {
        document.documentElement.style.setProperty('--color-primary', '#bfaa8c');
        document.documentElement.style.setProperty('--color-primary-light', '#d1c0a8');
        document.documentElement.style.setProperty('--color-primary-dark', '#c8ad7e');

        document.documentElement.style.setProperty('--color-primary-translucent', '#bfaa8ccc');
        document.documentElement.style.setProperty('--color-primary-light-translucent', '#d1c0a8cc');
        document.documentElement.style.setProperty('--color-primary-dark-translucent', '#c8ad7ecc');
    };

    const onLogin = (user) => {
        setIsLoggedIn(true);
        setUser(user);
        if (user.designation === "Receptionist") {
            setReceptionistColors();
        } else if (user.designation === "Clerk") {
            setClerkColors();
        } else if (user.designation === "Doctor") {
            setDoctorColors();
        } else {
            setAdminColors();
        }
    };

    const onLogout = () => {
        setUser(null);
        setIsLoggedIn(false);
        setBaseColors();
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
