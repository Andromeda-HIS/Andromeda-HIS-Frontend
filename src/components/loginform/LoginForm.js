import { useState, useContext } from "react";
import useInput from "../../hooks/use-input";
import UserContext from "../../store/user-context";
import classes from "./LoginForm.module.css";

const isNotEmpty = (value) => value.trim() !== "";

const LoginForm = () => {
    const userCtx = useContext(UserContext);

    const [designation, setDesignation] = useState("Receptionist");

    const designationChangeHandler = (designation) => {
        setUsernameExists(true);
        setDesignation(designation);
    };

    const {
        value: userName,
        isValid: userNameIsValid,
        hasError: userNameInputHasError,
        valueChangeHandler: userNameChangeHandler,
        inputBlurHandler: userNameInputBlurHandler,
        reset: resetUserName,
    } = useInput(isNotEmpty);

    const {
        value: password,
        isValid: passwordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordInputBlurHandler,
        reset: resetPassword,
    } = useInput(isNotEmpty);

    const [usernameExists, setUsernameExists] = useState(true);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);

    let formIsValid = false;
    if (userNameIsValid && usernameExists && passwordIsValid) {
        formIsValid = true;
    }

    const normalClasses = classes["input__field"];
    const errorClasses = classes["input__error"];

    const userNameInputClasses =
        userNameInputHasError || !usernameExists ? errorClasses : normalClasses;
    const passwordInputClasses =
        passwordInputHasError || !isPasswordCorrect
            ? errorClasses
            : normalClasses;

    const loginHandler = (data, user) => {
        if (!data.success) {
            if (data.errorMessage === "Incorrect username") {
                setUsernameExists(false);
            } else {
                setIsPasswordCorrect(false);
            }
        } else {
            resetUserName();
            resetPassword();
            userCtx.onLogin(user);
        }
    };

    const loginUser = async (user) => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/login/?userName=${user.userName}&password=${user.password}&designation=${user.designation}`;
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .catch((error) => console.log(error))
            .then((response) => response.json())
            .then((data) => loginHandler(data, {userName: user.userName, designation: user.designation}));
    };

    const masterUsernameChangeHandler = (event) => {
        userNameChangeHandler(event);
        setIsPasswordCorrect(true);
        setUsernameExists(true);
    };

    const masterPasswordChangeHandler = (event) => {
        passwordChangeHandler(event);
        setIsPasswordCorrect(true);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (formIsValid) {
            const user = {
                userName: userName.trim(),
                password,
                designation,
            };
            loginUser(user);
        }
    };

    return (
        <form
            className={`${classes["form"]}`}
            autoComplete="off"
            onSubmit={submitHandler}
        >
            <h1 className={classes["form__title"]}>Login</h1>
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
                    {(userNameInputHasError || !usernameExists) && (
                        <p className={classes["input__message"]}>
                            {userNameInputHasError
                                ? "Username must not be empty."
                                : "Username does not exist."}
                        </p>
                    )}
                    {!userNameInputHasError && <p>&nbsp;</p>}
                </div>
                <div className={`${classes["input"]}`}>
                    <label
                        className={`${classes["input__label"]}`}
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className={passwordInputClasses}
                        id="password"
                        type="password"
                        value={password}
                        name="password"
                        onChange={masterPasswordChangeHandler}
                        onBlur={passwordInputBlurHandler}
                    />
                    {(passwordInputHasError || !isPasswordCorrect) && (
                        <p className={classes["input__message"]}>
                            {passwordInputHasError
                                ? "Password must not be empty."
                                : "Incorrect password."}
                        </p>
                    )}
                    {!passwordInputHasError && <p>&nbsp;</p>}
                </div>
            </div>
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
                                    designation === "Clerk"
                                        ? classes["active"]
                                        : ""
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
                                    designation === "Admin"
                                        ? classes["active"]
                                        : ""
                                }`}
                            ></span>
                        </span>
                        <div>Admin</div>
                    </li>
                </ul>
            </div>
            <div className={`${classes["form__btn-group"]}`}>
                <button
                    className={`${classes["form__btn"]}`}
                    // disabled={!formIsValid}
                >
                    Login
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
