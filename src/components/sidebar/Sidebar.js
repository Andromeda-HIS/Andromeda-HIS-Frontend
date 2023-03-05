import IcomoonReact from "icomoon-react";
import iconSet from "./imgs/selection.json";

import classes from "./Sidebar.module.css";

import { useContext } from "react";
import UserContext from "../../store/user-context";

import {
    faUserPlus,
    faUserMinus,
    faUser,
    faRegistered,
    faHippo,
    faMugSaucer,
    faUserDoctor,
    faFaceAngry,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const userCtx = useContext(UserContext);

    const location = useLocation();
    const activeTab = location.pathname.split("/").pop();

    let tabs = [
        { title: "Add User", icon: faUserPlus },
        { title: "Delete User", icon: faUserMinus },
    ];
    if (userCtx.user.designation === "Receptionist") {
        tabs = [
            { title: "Register Patient", icon: faHippo },
            { title: "Admit Patient", icon: faMugSaucer },
            { title: "Make Appointment", icon: faFaceAngry },
            { title: "Discharge Patient", icon: faUserDoctor },
        ];
    } else if (userCtx.user.designation === "Clerk") {
        tabs = [
            { title: "Schedule Test", icon: faHippo },
            { title: "Schedule Treatment", icon: faMugSaucer },
        ];
    } else if (userCtx.user.designation === "Doctor") {
        tabs = [
            { title: "Search Patient", icon: faSearch },
            { title: "Treat", icon: faUserDoctor }
        ];
    }

    tabs = [{ title: "Account", icon: faUser }, ...tabs];

    return (
        <nav className={classes["sidebar"]}>
            <ul className={classes["side-nav"]}>
                {tabs.map((tab, index) => {
                    return (
                        <li
                            key={index}
                            className={`${classes["side-nav__item"]} ${
                                tab.title.toLowerCase().replace(" ", "") ===
                                activeTab
                                    ? classes["side-nav__item--active"]
                                    : ""
                            }`}
                        >
                            <Link
                                to={`/profile/${tab.title
                                    .toLowerCase()
                                    .replace(" ", "")}`}
                                className={classes["side-nav__link"]}
                            >
                                <FontAwesomeIcon
                                    className={classes["side-nav__icon"]}
                                    icon={tab.icon}
                                />
                                <span>{tab.title}</span>
                            </Link>
                        </li>
                    );
                })}
                {/* <li
                    className={`${classes["side-nav__item"]} ${classes["side-nav__item--active"]}`}
                >
                    <a href="/" className={classes["side-nav__link"]}>
                        <IcomoonReact
                            className={classes["side-nav__icon"]}
                            iconSet={iconSet}
                            icon="home"
                        />
                        <span>Hotel</span>
                    </a>
                </li>
                <li className={classes["side-nav__item"]}>
                    <a href="/" className={classes["side-nav__link"]}>
                        <IcomoonReact
                            className={classes["side-nav__icon"]}
                            iconSet={iconSet}
                            icon="aircraft"
                        />
                        <span>Flight</span>
                    </a>
                </li>
                <li className={classes["side-nav__item"]}>
                    <a href="/" className={classes["side-nav__link"]}>
                        <IcomoonReact
                            className={classes["side-nav__icon"]}
                            iconSet={iconSet}
                            icon="mask"
                        />
                        <span>Car Rentals</span>
                    </a>
                </li>
                <li className={classes["side-nav__item"]}>
                    <a href="/" className={classes["side-nav__link"]}>
                        <IcomoonReact
                            className={classes["side-nav__icon"]}
                            iconSet={iconSet}
                            icon="500px-with-circle"
                        />
                        <span>Tours</span>
                    </a>
                </li> */}
            </ul>
            <div className={classes["legal"]}>
                &copy; 2023 by andromeda. All rights reserved.
            </div>
        </nav>
    );
};

export default Sidebar;
