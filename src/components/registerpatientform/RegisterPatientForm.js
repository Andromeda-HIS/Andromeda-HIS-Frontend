import { useState } from "react";
import useInput from "../../hooks/use-input";

import FormCard from "../formcard/FormCard";

import classes from "./RegisterPatientForm.module.css";

const isNotEmpty = (value) => value.trim() !== "";

const RegisterPatientForm = () => {
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

    let formIsValid = false;
    if (nameIsValid && addressIsValid) {
        formIsValid = true;
    }

    const normalClasses = classes["input__field"];
    const errorClasses = classes["input__error"];

    const nameInputClasses = nameInputHasError ? errorClasses : normalClasses;

    const addressInputClasses = addressInputHasError
        ? errorClasses
        : normalClasses;

    const nameErrorMessage = nameInputHasError
        ? "Name must not be empty."
        : null;

    const addressErrorMessage = addressInputHasError
        ? "Address must not be empty."
        : null;

    const masterNameChangeHandler = (event) => {
        nameChangeHandler(event);
    };

    const masterAddressChangeHandler = (event) => {
        addressChangeHandler(event);
    };

    const registerPatientResponseHandler = (data) => {
        resetName();
        resetAddress();
    };

    const registerPatient = async (patient) => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/receptionist/register/`;
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(patient),
        })
            .then((response) => response.json())
            .then((data) => registerPatientResponseHandler(data, patient))
            .catch((error) => console.log(error));
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (formIsValid) {
            let patient = {
                name,
                address,
            };

            console.log(patient);
            registerPatient(patient);
        }
    };

    return (
        <FormCard>
            <form
                className={`${classes["form"]}`}
                autoComplete="off"
                onSubmit={submitHandler}
            >
                <h1 className={classes["form__title"]}>Register Patient</h1>
                <div className={`${classes["form__inputs"]}`}>
                    <div className={classes["input"]}>
                        <label
                            className={`${classes["input__label"]}`}
                            htmlFor="name"
                        >
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

export default RegisterPatientForm;
