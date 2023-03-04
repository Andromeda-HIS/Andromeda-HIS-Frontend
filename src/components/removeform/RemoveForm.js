import { useState } from "react";
import useInput from "../../hooks/use-input";

import classes from "./RemoveForm.module.css";

const isNotEmpty = (value) => value.trim() !== "";

const RemoveForm = () => {
    const [designation, setDesignation] = useState("Receptionist");

    const designationChangeHandler = (designation) => {
        setDesignation(designation);
        resetUserName();
    };

    const {
        value: userName,
        isValid: userNameIsValid,
        hasError: userNameInputHasError,
        valueChangeHandler: userNameChangeHandler,
        inputBlurHandler: userNameInputBlurHandler,
        reset: resetUserName,
    } = useInput(isNotEmpty);

    const [userNameExists, setUsernameExists] = useState(true);

    let formIsValid = false;
    if (userNameIsValid && userNameExists) {
        formIsValid = true;
    }

    const normalClasses = classes["input__field"];
    const errorClasses = classes["input__error"];

    const userNameInputClasses =
        (userNameInputHasError || !userNameExists) ? errorClasses : normalClasses;

    const userNameErrorMessage =
        (userNameInputHasError || !userNameExists)
            ? userNameInputHasError
                ? "Username must not be empty."
                : "Username does not exist."
            : null;
  
    const masterUsernameChangeHandler = (event) => {
        userNameChangeHandler(event);
        setUsernameExists(false);
    };

    const removeUserResponseHandler = (data) => {

    }

    const removeUser = async (user) => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/admin/deleteuser`;
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
            .then((response) => response.json())
            .then((data) => removeUserResponseHandler(data, user))
            .catch((error) => console.log(error));
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (formIsValid) {
            let user = {
                userName: userName.trim(),
                designation,
            };

            console.log(user);
            // removeUser(user);
        }
    };

    const radioButtons = (
        <div className={classes["radio-btn__container"]}>
            <ul className={classes["radio-btn__group"]}>
                <li
                    className={classes["radio-btn"]}
                    onClick={() => designationChangeHandler("Receptionist")}
                >
                    <span className={classes["radio-btn__indicator"]}>
                        <span
                            className={`${classes["inner"]} ${
                                designation === "Receptionist"
                                    ? classes["active"]
                                    : ""
                            }`}
                        ></span>
                    </span>
                    <div>Receptionist</div>
                </li>
                <li
                    className={classes["radio-btn"]}
                    onClick={() => designationChangeHandler("Clerk")}
                >
                    <span className={classes["radio-btn__indicator"]}>
                        <span
                            className={`${classes["inner"]} ${
                                designation === "Clerk" ? classes["active"] : ""
                            }`}
                        ></span>
                    </span>
                    <div>Clerk</div>
                </li>
            </ul>
            <ul className={classes["radio-btn__group"]}>
                <li
                    className={classes["radio-btn"]}
                    onClick={() => designationChangeHandler("Doctor")}
                >
                    <span className={classes["radio-btn__indicator"]}>
                        <span
                            className={`${classes["inner"]} ${
                                designation === "Doctor"
                                    ? classes["active"]
                                    : ""
                            }`}
                        ></span>
                    </span>
                    <div>Doctor</div>
                </li>
                <li
                    className={classes["radio-btn"]}
                    onClick={() => designationChangeHandler("Admin")}
                >
                    <span className={classes["radio-btn__indicator"]}>
                        <span
                            className={`${classes["inner"]} ${
                                designation === "Admin" ? classes["active"] : ""
                            }`}
                        ></span>
                    </span>
                    <div>Admin</div>
                </li>
            </ul>
        </div>
    );

    return (
        <form
            className={`${classes["form"]}`}
            autoComplete="off"
            onSubmit={submitHandler}
        >
            <h1 className={classes["form__title"]}>Remove</h1>
            {radioButtons}
            <div className={`${classes["form__inputs"]}`}>
                <div className={classes["input"]}>
                    <label
                        className={`${classes["input__label"]}`}
                        htmlFor="userName"
                    >
                        Username
                    </label>
                    <input
                        className={userNameInputClasses}
                        id="userName"
                        type="text"
                        value={userName}
                        name="username"
                        onChange={masterUsernameChangeHandler}
                        onBlur={userNameInputBlurHandler}
                    />
                    {userNameErrorMessage ? (
                        <p className={classes["input__message"]}>
                            {userNameErrorMessage}
                        </p>
                    ) : (
                        <p>&nbsp;</p>
                    )}
                </div>
            </div>
            <div className={`${classes["form__btn-group"]}`}>
                <button
                    className={`${classes["form__btn"]}`}
                    // disabled={!formIsValid}
                >
                    Remove
                </button>
            </div>
        </form>
    );
};

export default RemoveForm;
