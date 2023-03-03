import IcomoonReact from "icomoon-react";
import iconSet from "./imgs/selection.json";

import classes from "./Sidebar.module.css";

const Sidebar = () => {
    return (
        <nav className={classes["sidebar"]}>
            <ul className={classes["side-nav"]}>
                <li className={`${classes["side-nav__item"]} ${classes["side-nav__item--active"]}`}>
                    <a href="/" className={classes["side-nav__link"]}>
                        <IcomoonReact className={classes["side-nav__icon"]} iconSet={iconSet} icon="home" /> 
                        <span>Hotel</span>
                    </a>
                </li>
                <li className={classes["side-nav__item"]}>
                    <a href="/" className={classes["side-nav__link"]}>
                        <IcomoonReact className={classes["side-nav__icon"]} iconSet={iconSet} icon="aircraft" /> 
                        <span>Flight</span>
                    </a>
                </li>
                <li className={classes["side-nav__item"]}>
                    <a href="/" className={classes["side-nav__link"]}>
                        <IcomoonReact className={classes["side-nav__icon"]} iconSet={iconSet} icon="mask" /> 
                        <span>Car Rentals</span>
                    </a>
                </li>
                <li className={classes["side-nav__item"]}>
                    <a href="/" className={classes["side-nav__link"]}>
                        <IcomoonReact className={classes["side-nav__icon"]} iconSet={iconSet} icon="500px-with-circle" /> 
                        <span>Tours</span>
                    </a>
                </li>
            </ul>
            <div className={classes["legal"]}>
                &copy; 2023 by andromeda. All rights reserved.
            </div>
        </nav>
    );
};

export default Sidebar;