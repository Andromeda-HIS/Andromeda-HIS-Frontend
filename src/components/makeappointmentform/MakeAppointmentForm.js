import { useState } from "react";
import useInput from "../../hooks/use-input";

import classes from "./MakeAppointmentForm.module.css";

import FormCard from "../formcard/FormCard";

const isNotEmpty = (value) => value.trim() !== "";

const MakeAppointmentForm = (props) => {
    const {
        value: patientId,
        isValid: patientIdIsValid,
        hasError: patientIdInputHasError,
        valueChangeHandler: patientIdChangeHandler,
        inputBlurHandler: patientIdInputBlurHandler,
        reset: resetPatientId,
    } = useInput(isNotEmpty);

    const {
        value: symptoms,
        isValid: symptomsIsValid,
        hasError: symptomsInputHasError,
        valueChangeHandler: symptomsChangeHandler,
        inputBlurHandler: symptomsInputBlurHandler,
        reset: resetSymptoms,
    } = useInput(isNotEmpty);

    const {
        value: date,
        isValid: dateIsValid,
        hasError: dateInputHasError,
        valueChangeHandler: dateChangeHandler,
        inputBlurHandler: dateInputBlurHandler,
        reset: resetDate,
    } = useInput(isNotEmpty);

    const [patientIdExists, setPatientIdExists] = useState(true);
    const [appointmentExists, setAppointmentExists] = useState(false);

    const normalClasses = classes["input__field"];
    const errorClasses = classes["input__error"];

    const patientIdInputClasses =
        patientIdInputHasError || !patientIdExists || appointmentExists
            ? errorClasses
            : normalClasses;

    const symptomsInputClasses = symptomsInputHasError
        ? errorClasses
        : normalClasses;

    let patientIdErrorMessage = null;
    if (patientIdInputHasError) {
        patientIdErrorMessage = "Patient Id cannot be empty,";
    } else if (!patientIdExists) {
        patientIdErrorMessage = "Patient does not exist.";
    } else if (appointmentExists) {
        patientIdErrorMessage =
            "Patient already made an appointment for the given day.";
    }

    let symptomsErrorMessage = null;
    if (symptomsInputHasError) {
        symptomsErrorMessage = "Symptoms cannot be empty.";
    }

    const submitHandler = (event) => {
        event.preventDefault();

        appointmentHandler({
            patient_id: +patientId,
            doctor_username: props.selected.userName,
            date,
            symptoms,
        });
    };

    const appointmentResponseHandler = (data) => {
        console.log(data);
        if (!data.success) {
            if (data.errorMessage === "Patient does not exist") {
                setPatientIdExists(false);
            } else if (data.errorMessage === "Doctor is unavailable") {
                props.onChangeDoctorAvailablility(false);
            } else if (data.errorMessage === "Appointment already exists") {
                setAppointmentExists(true);
            }
        } else {
            props.onAppointment();
            resetPatientId();
            setAppointmentExists(false);
            props.onChangeDoctorAvailablility(true);
        }
    };

    const appointmentHandler = async (appointment) => {
        window.scroll(0, 0);
        console.log(appointment);
        const url = `http://localhost:8000/receptionist/scheduleappt/`;
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(appointment),
        })
            .then((response) => response.json())
            .then((data) => appointmentResponseHandler(data))
            .catch((error) => console.log(error));
    };

    const masterPatientIdChangeHandler = (event) => {
        patientIdChangeHandler(event);
        setPatientIdExists(true);
    };

    return (
        <FormCard>
            <form
                className={`${classes["form"]}`}
                autoComplete="off"
                onSubmit={submitHandler}
            >
                <h1 className={classes["form__title"]}>Make Appointment</h1>
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
                    <div className={classes["input"]}>
                        <label
                            className={`${classes["input__label"]}`}
                            htmlFor="symptoms"
                        >
                            Symptoms
                        </label>
                        <input
                            className={symptomsInputClasses}
                            id="symptoms"
                            type="text"
                            value={symptoms}
                            name="symptoms"
                            onChange={symptomsChangeHandler}
                            onBlur={symptomsInputBlurHandler}
                        />
                        {symptomsErrorMessage ? (
                            <p className={classes["input__message"]}>
                                {symptomsErrorMessage}
                            </p>
                        ) : (
                            <p>&nbsp;</p>
                        )}
                    </div>
                    <div className={classes["input"]}>
                        <label
                            className={`${classes["input__label"]}`}
                            htmlFor="date"
                        >
                            Date
                        </label>
                        <input
                            className={symptomsInputClasses}
                            id="date"
                            type="date"
                            value={date}
                            name="date"
                            onChange={dateChangeHandler}
                            onBlur={dateInputBlurHandler}
                        />
                        {symptomsErrorMessage ? (
                            <p className={classes["input__message"]}>
                                {symptomsErrorMessage}
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
                        Schedule
                    </button>
                </div>
            </form>
        </FormCard>
    );
};

export default MakeAppointmentForm;
