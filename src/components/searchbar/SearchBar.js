import { faListNumeric, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";

import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
    const [queryType, setQueryType] = useState("By Id");

    const queryTypeChangeHandler = (type) => {
        setQueryType(type);
    };

    const serachInputRef = useRef();

    const radioButtons = (
        <div className={classes["radio-btn__container"]}>
            <ul className={classes["radio-btn__group"]}>
                <li
                    className={classes["radio-btn"]}
                    onClick={() => queryTypeChangeHandler("Receptionist")}
                >
                    <span className={classes["radio-btn__indicator"]}>
                        <span
                            className={`${classes["inner"]} ${
                                queryType === "By Id" ? classes["active"] : ""
                            }`}
                        ></span>
                    </span>
                    <div>By Id</div>
                </li>
                <li
                    className={classes["radio-btn"]}
                    onClick={() => queryTypeChangeHandler("By Name")}
                >
                    <span className={classes["radio-btn__indicator"]}>
                        <span
                            className={`${classes["inner"]} ${
                                queryType === "By Name" ? classes["active"] : ""
                            }`}
                        ></span>
                    </span>
                    <div>By Name</div>
                </li>
                <li
                    className={classes["radio-btn"]}
                    onClick={() => queryTypeChangeHandler("Treated by Me")}
                >
                    <span className={classes["radio-btn__indicator"]}>
                        <span
                            className={`${classes["inner"]} ${
                                queryType === "Treated by Me"
                                    ? classes["active"]
                                    : ""
                            }`}
                        ></span>
                    </span>
                    <div>Treated By Me</div>
                </li>
            </ul>
        </div>
    );

    return (
        <>
            <form className={classes["search"]}>
                <input
                    type="text"
                    className={classes["search__input"]}
                    placeholder="Search treated patients"
                    ref={serachInputRef}
                    onChange={() => props.onChangeQuery(serachInputRef.current.value)}
                />
                <button className={classes["search__button"]}>
                    <FontAwesomeIcon
                        className={classes["search__icon"]}
                        icon={faSearch}
                    />
                </button>
            </form>
        </>
    );
};

export default SearchBar;
