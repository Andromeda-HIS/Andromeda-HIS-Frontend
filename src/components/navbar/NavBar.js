import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../../store/user-context";
import IcomoonReact from "icomoon-react";
import iconSet from "./imgs/selection.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faPowerOff,
    faA,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./NavBar.module.css";

const NavBar = () => {
    const userCtx = useContext(UserContext);

    let navbarEndContent = (
        <div className={classes["nav-btn__group"]}>
            <Link
                to="/login"
                className={`${classes["login"]}`}
            >
                Login
            </Link>
        </div>
    );

    if (userCtx.isLoggedIn) {
        navbarEndContent = (
            <nav className={classes["primary-navigation"]}>
                <ul className={`${classes["primary-navigation__list"]} ${classes["navigation-end"]}`}>
                    <li className={classes["primary-navigation__list-item"]}>
                        <NavLink
                            to="/profile/account"
                            className={({ isActive }) =>
                                isActive ? classes["active"] : undefined
                            }
                            end
                        >
                            <FontAwesomeIcon
                                className={classes["primary-navigation__icon"]}
                                icon={faUser}
                            />
                            &nbsp; {userCtx.user.userName}
                        </NavLink>
                    </li>
                    <li className={`${classes["primary-navigation__list-item"]} ${classes["navigation-end-item"]}`}>
                        <button
                            className={classes["poweroff"]}
                            onClick={userCtx.onLogout}
                        >
                            <FontAwesomeIcon icon={faPowerOff} className={classes["poweroff__icon"]} />
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }

    return (
        <header className={classes["header"]}>
            <div className={classes["logo"]}>
                <FontAwesomeIcon icon={faA} className={classes["logo__icon"]} />
            </div>
            <nav className={classes["primary-navigation"]}>
                <ul className={classes["primary-navigation__list"]}>
                    <li className={classes["primary-navigation__list-item"]}>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? classes["active"] : undefined
                            }
                            end
                        >
                            <IcomoonReact
                                className={classes["primary-navigation__icon"]}
                                iconSet={iconSet}
                                icon="home"
                            />
                            &nbsp; Home
                        </NavLink>
                    </li>
                    <li className={classes["primary-navigation__list-item"]}>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive ? classes["active"] : undefined
                            }
                            end
                        >
                            <IcomoonReact
                                className={classes["primary-navigation__icon"]}
                                iconSet={iconSet}
                                icon="mail"
                            />
                            &nbsp; Contact Us
                        </NavLink>
                    </li>
                </ul>
            </nav>
            {navbarEndContent}
        </header>
    );
};

export default NavBar;
