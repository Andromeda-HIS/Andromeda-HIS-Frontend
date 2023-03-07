import { useState } from "react";
import useInput from "../../hooks/use-input";

import FormCard from "../formcard/FormCard";

import classes from "./AddUserForm.module.css";
import ResponseModal from "../responsemodal/ResponseModal";

const isNotEmpty = (value) => value.trim() !== "";

const AddUserForm = () => {
    const [designation, setDesignation] = useState("Receptionist");
    const [modalOn, setModalOn] = useState(false);
    const [modalTitle, setModalTitle] = useState(null);
    const [modalMessage, setModalMessage] = useState(null);

    const hideModalHandler = () => {
        setModalOn(false);
    }

    const showModalHandler = (title, message) => {
        setModalTitle(title);
        setModalMessage(message);
        setModalOn(true);
    }

    const designationChangeHandler = (designation) => {
        setDesignation(designation);
        resetUserName();
        resetPassword();
        resetConfirmPassword();
        resetName();
        resetAddress();
        resetDepartment();
        setUsernameExists(false);
    };

    const {
        value: userName,
        isValid: userNameIsValid,
        hasError: userNameInputHasError,
        valueChangeHandler: userNameChangeHandler,
        inputBlurHandler: userNameInputBlurHandler,
        reset: resetUserName,
    } = useInput(isNotEmpty);

    const [userNameExists, setUsernameExists] = useState(false);

    const {
        value: password,
        isValid: passwordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordInputBlurHandler,
        reset: resetPassword,
    } = useInput(isNotEmpty);

    const {
        value: confirmPassword,
        isValid: confirmPassowrdIsValid,
        hasError: confirmPasswordInputHasError,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordInputBlurHandler,
        reset: resetConfirmPassword,
    } = useInput(isNotEmpty);

    const passwordsMatch =
        password === "" || (password !== "" && password === confirmPassword);

    const {
        value: name,
        isValid: nameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameInputBlurHandler,
        reset: resetName,
    } = useInput(isNotEmpty);

    const {
        value: address,
        isValid: addressIsValid,
        hasError: addressInputHasError,
        valueChangeHandler: addressChangeHandler,
        inputBlurHandler: addressInputBlurHandler,
        reset: resetAddress,
    } = useInput(isNotEmpty);

    const {
        value: department,
        isValid: departmentIsValid,
        hasError: departmentInputHasError,
        valueChangeHandler: departmentChangeHandler,
        inputBlurHandler: departmentInputBlurHandler,
        reset: resetDepartment,
    } = useInput(isNotEmpty);

    let formIsValid = false;
    if (designation === "Admin") {
        if (
            userNameIsValid &&
            !userNameExists &&
            passwordIsValid &&
            confirmPassowrdIsValid &&
            passwordsMatch
        ) {
            formIsValid = true;
        }
    } else if (designation === "Doctor") {
        if (
            userNameIsValid &&
            !userNameExists &&
            passwordIsValid &&
            confirmPassowrdIsValid &&
            passwordsMatch &&
            nameIsValid &&
            addressIsValid &&
            departmentIsValid
        ) {
            formIsValid = true;
        }
    } else {
        if (
            userNameIsValid &&
            !userNameExists &&
            passwordIsValid &&
            confirmPassowrdIsValid &&
            passwordsMatch &&
            nameIsValid &&
            addressIsValid
        ) {
            formIsValid = true;
        }
    }

    const normalClasses = classes["input__field"];
    const errorClasses = classes["input__error"];

    const userNameInputClasses =
        userNameInputHasError || userNameExists ? errorClasses : normalClasses;
    const passwordInputClasses = passwordInputHasError
        ? errorClasses
        : normalClasses;
    const confirmPasswordInputClasses =
        confirmPasswordInputHasError || !passwordsMatch
            ? errorClasses
            : normalClasses;
    const nameInputClasses = nameInputHasError ? errorClasses : normalClasses;
    const addressInputClasses = addressInputHasError
        ? errorClasses
        : normalClasses;
    const departmentInputClasses = departmentInputHasError
        ? errorClasses
        : normalClasses;

    const userNameErrorMessage =
        userNameInputHasError || userNameExists
            ? userNameInputHasError
                ? "Username must not be empty."
                : "Username already exists."
            : null;
    const passwordErrorMessage = passwordInputHasError
        ? "Password must not be empty."
        : null;
    const confirmPasswordErrorMessage =
        confirmPasswordInputHasError || !passwordsMatch
            ? confirmPasswordInputHasError
                ? "Password must not be empty."
                : "Passwords do not match."
            : null;
    const nameErrorMessage = nameInputHasError
        ? "Name must not be empty"
        : null;
    const addressErrorMessage = addressInputHasError
        ? "Address must not be empty"
        : null;
    const departmentErrorMessage = departmentInputHasError
        ? "Department must not be empty"
        : null;

    const masterUsernameChangeHandler = (event) => {
        userNameChangeHandler(event);
        setUsernameExists(false);
    };

    const masterPasswordChangeHandler = (event) => {
        passwordChangeHandler(event);
    };

    const masterConfirmPasswordChangeHandler = (event) => {
        confirmPasswordChangeHandler(event);
    };

    const masterNameChangeHandler = (event) => {
        nameChangeHandler(event);
    };

    const masterAddressChangeHandler = (event) => {
        addressChangeHandler(event);
    };

    const masterDepartmentChangeHandler = (event) => {
        departmentChangeHandler(event);
    };

    const registerResponseHandler = (data, user) => {
        if (!data.success) {
            setUsernameExists(true);
        } else {
            showModalHandler("Add User", "Successfully added the user to the database.");
        }
    };

    const registerUser = async (user) => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/admin/`;
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((response) => response.json())
            .then((data) => registerResponseHandler(data, user))
            .catch((error) => console.log(error));
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (formIsValid) {
            let user = {
                username: userName.trim(),
                password,
                designation,
                name,
                address
            };

            if (designation === "Doctor") {
                user = { ...user, department };
            }

            console.log(user);
            registerUser(user);
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

    const basicInputs = (
        <>
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
                {passwordErrorMessage ? (
                    <p className={classes["input__message"]}>
                        {passwordErrorMessage}
                    </p>
                ) : (
                    <p>&nbsp;</p>
                )}
            </div>
            <div className={`${classes["input"]}`}>
                <label
                    className={`${classes["input__label"]}`}
                    htmlFor="confirmPassword"
                >
                    Confirm Password
                </label>
                <input
                    className={confirmPasswordInputClasses}
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    name="confirmPassword"
                    onChange={masterConfirmPasswordChangeHandler}
                    onBlur={confirmPasswordInputBlurHandler}
                />
                {confirmPasswordErrorMessage ? (
                    <p className={classes["input__message"]}>
                        {confirmPasswordErrorMessage}
                    </p>
                ) : (
                    <p>&nbsp;</p>
                )}
            </div>
        </>
    );

    const staffSpecificInputs = (
        <>
            <div className={classes["input"]}>
                <label className={`${classes["input__label"]}`} htmlFor="name">
                    Name
                </label>
                <input
                    className={nameInputClasses}
                    id="name"
                    type="text"
                    value={name}
                    name="name"
                    onChange={masterNameChangeHandler}
                    onBlur={nameInputBlurHandler}
                />
                {nameErrorMessage ? (
                    <p className={classes["input__message"]}>
                        {nameErrorMessage}
                    </p>
                ) : (
                    <p>&nbsp;</p>
                )}
            </div>
            <div className={classes["input"]}>
                <label
                    className={`${classes["input__label"]}`}
                    htmlFor="address"
                >
                    Address
                </label>
                <input
                    className={addressInputClasses}
                    id="address"
                    type="text"
                    value={address}
                    name="address"
                    onChange={masterAddressChangeHandler}
                    onBlur={addressInputBlurHandler}
                />
                {addressErrorMessage ? (
                    <p className={classes["input__message"]}>
                        {addressErrorMessage}
                    </p>
                ) : (
                    <p>&nbsp;</p>
                )}
            </div>
        </>
    );

    const doctorSpecificInputs = (
        <>
            <div className={classes["input"]}>
                <label
                    className={`${classes["input__label"]}`}
                    htmlFor="department"
                >
                    Department
                </label>
                <input
                    className={departmentInputClasses}
                    id="department"
                    type="text"
                    value={department}
                    name="department"
                    onChange={masterDepartmentChangeHandler}
                    onBlur={departmentInputBlurHandler}
                />
                {departmentErrorMessage ? (
                    <p className={classes["input__message"]}>
                        {departmentErrorMessage}
                    </p>
                ) : (
                    <p>&nbsp;</p>
                )}
            </div>
        </>
    );

    return (
        <FormCard>
            {modalOn && <ResponseModal onConfirm={hideModalHandler} title={modalTitle} message={modalMessage}/>}
            <form
                className={`${classes["form"]}`}
                autoComplete="off"
                onSubmit={submitHandler}
            >
                <h1 className={classes["form__title"]}>Register</h1>
                {radioButtons}
                <div className={`${classes["form__inputs"]}`}>
                    {basicInputs}
                    {staffSpecificInputs}
                    {designation === "Doctor" && doctorSpecificInputs}
                </div>
                <div className={`${classes["form__btn-group"]}`}>
                    <button
                        className={`${classes["form__btn"]}`}
                        // disabled={!formIsValid}
                    >
                        Register
                    </button>
                </div>
            </form>
        </FormCard>
    );
};

export default AddUserForm;
