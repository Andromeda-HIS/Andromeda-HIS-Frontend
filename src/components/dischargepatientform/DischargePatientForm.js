import { useState } from "react";
import useInput from "../../hooks/use-input";

import classes from "./DischargePatientForm.module.css";

import FormCard from "../formcard/FormCard";

const isNotEmpty = (value) => value.trim() !== "";

const DischargePatientForm = () => {
    const {
        value: patientId,
        isValid: patientIdIsValid,
        hasError: patientIdInputHasError,
        valueChangeHandler: patientIdChangeHandler,
        inputBlurHandler: patientIdInputBlurHandler,
        reset: resetPatientId,
    } = useInput(isNotEmpty);

    const [patientIdExists, setPatientIdExists] = useState(true);
    const [isAdmitted, setIsAdmitted] = useState(true);

    const normalClasses = classes["input__field"];
    const errorClasses = classes["input__error"];

    const patientIdInputClasses =
        patientIdInputHasError || !patientIdExists || !isAdmitted
            ? errorClasses
            : normalClasses;

    let patientIdErrorMessage = null;
    if (patientIdInputHasError) {
        patientIdErrorMessage = "Patient Id cannot be empty,";
    } else if (!patientIdExists) {
        patientIdErrorMessage = "Patient does not exist.";
    } else if (!isAdmitted) {
        patientIdErrorMessage = "Patient has not been admitted.";
    }

    const dischargeResponseHandler = (data) => {
        console.log(data);
        if (!data.success) {
            if (data.errorMessage === "No such patient found") {
                setPatientIdExists(false);
            } else {
                setIsAdmitted(false);
            }
        } else {
            resetPatientId();
            setPatientIdExists(true);
            setIsAdmitted(true);
        }
    };

    const dischargeHandler = async (discharge) => {
        window.scroll(0, 0);
        console.log(discharge);
        const url = `http://localhost:8000/receptionist/discharge/`;
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ patient_id: +discharge.patientId }),
        })
            .then((response) => response.json())
            .then((data) => dischargeResponseHandler(data))
            .catch((error) => console.log(error));
    };

    const submitHandler = (event) => {
        event.preventDefault();

        dischargeHandler({ patientId: +patientId });
    };

    const masterPatientIdChangeHandler = (event) => {
        patientIdChangeHandler(event);
        setPatientIdExists(true);
        setIsAdmitted(true);
    };

    return (
        <FormCard>
            <form
                className={`${classes["form"]}`}
                autoComplete="off"
                onSubmit={submitHandler}
            >
                <h1 className={classes["form__title"]}>Discharge Patient</h1>
                <div className={`${classes["form__inputs"]}`}>
                    <div className={classes["input"]}>
                        <label
                            className={`${classes["input__label"]}`}
                            htmlFor="patientId"
                        >
                            Patient Id
                        </label>
                        <input
                            className={patientIdInputClasses}
                            id="patientId"
                            type="text"
                            value={patientId}
                            name="patientId"
                            onChange={masterPatientIdChangeHandler}
                            onBlur={patientIdInputBlurHandler}
                        />
                        {patientIdErrorMessage ? (
                            <p className={classes["input__message"]}>
                                {patientIdErrorMessage}
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
                        Discharge
                    </button>
                </div>
            </form>
        </FormCard>
    );
};

export default DischargePatientForm;
