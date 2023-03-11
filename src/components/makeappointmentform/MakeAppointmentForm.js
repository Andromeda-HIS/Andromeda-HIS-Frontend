import { useEffect, useState } from "react";
import useInput from "../../hooks/use-input";

import classes from "./MakeAppointmentForm.module.css";

import ResponseModal from "../responsemodal/ResponseModal";

import FormCard from "../formcard/FormCard";

const isNotEmpty = (value) => value.trim() !== "";

const MakeAppointmentForm = (props) => {
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
    const [doctorAvailable, setDoctorAvailable] = useState(true);
    const [dateViolatesPhysics, setDateViolatesPhysics] = useState(true);

    const normalClasses = classes["input__field"];
    const errorClasses = classes["input__error"];

    const patientIdInputClasses =
        patientIdInputHasError || !patientIdExists || appointmentExists
            ? errorClasses
            : normalClasses;

    const symptomsInputClasses = symptomsInputHasError
        ? errorClasses
        : normalClasses;

    const dateInputClasses = dateInputHasError || dateViolatesPhysics ? errorClasses : normalClasses;

    useEffect(() => {
        setDoctorAvailable(true);
    }, [props.selected]);

    let patientIdErrorMessage = null;
    if (patientIdInputHasError) {
        patientIdErrorMessage = "Patient Id cannot be empty,";
    } else if (!patientIdExists) {
        patientIdErrorMessage = "Patient does not exist.";
    } else if (appointmentExists) {
        patientIdErrorMessage =
            "Patient already made an appointment for the given day.";
    } else if (!props.selected) {
        patientIdErrorMessage = "Please select a doctor.";
    } else if (!doctorAvailable) {
        patientIdErrorMessage = "Doctor not available";
    }

    let symptomsErrorMessage = null;
    if (symptomsInputHasError) {
        symptomsErrorMessage = "Symptoms cannot be empty.";
    }

    let dateErrorMessage = null;
    if (dateInputHasError) {
        dateErrorMessage = "Date cannot be empty.";
    } else if (dateViolatesPhysics) {
        dateErrorMessage = "Please enter a valid date.";
    }

    let formIsValid = false;
    if (patientIdIsValid && props.selected && doctorAvailable && !appointmentExists && symptomsIsValid && dateIsValid) {
        formIsValid = true;
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            appointmentHandler({
                patient_id: +patientId,
                doctor_username: props.selected.userName,
                date,
                symptoms,
            });
        }
    };

    const appointmentResponseHandler = (data) => {
        if (!data.success) {
            if (data.errorMessage === "Patient does not exist") {
                setPatientIdExists(false);
            } else if (data.errorMessage === "Doctor is unavailable") {
                setDoctorAvailable(false);
            } else if (data.errorMessage === "Appointment already exists") {
                setAppointmentExists(true);
            }
        } else {
            props.onAppointment();
            resetPatientId();
            resetSymptoms();
            resetDate();
            setAppointmentExists(false);
            setDoctorAvailable(true);
            setDateViolatesPhysics(false);
            showModalHandler("Make Appointment", "Successfully made the appointment.");
        }
    };

    const appointmentHandler = async (appointment) => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/receptionist/scheduleappt/`;
        fetch(url, {
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
        setAppointmentExists(false);
        setDoctorAvailable(true);
    };

    const masterDateChangeHandler = (event) => {
        dateChangeHandler(event);
        setAppointmentExists(false);
        if (event.target.value) {
            const currentDate  = new Date();
            const selectedDate = new Date(event.target.value);
            const diffDays = selectedDate.getDate() - currentDate.getDate();
            if (diffDays < 0 || diffDays > 6) {
                setDateViolatesPhysics(true);
            } else {
                setDateViolatesPhysics(false);
            }
        } 
    }

    return (
        <FormCard>
            <form
                className={`${classes["form"]}`}
                autoComplete="off"
                onSubmit={submitHandler}
            >
                {modalOn && <ResponseModal onConfirm={hideModalHandler} title={modalTitle} message={modalMessage}/>}
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
                            className={dateInputClasses}
                            id="date"
                            type="date"
                            value={date}
                            name="date"
                            onChange={masterDateChangeHandler}
                            onBlur={dateInputBlurHandler}
                        />
                        {dateErrorMessage ? (
                            <p className={classes["input__message"]}>
                                {dateErrorMessage}
                            </p>
                        ) : (
                            <p>&nbsp;</p>
                        )}
                    </div>
                </div>
                <div className={`${classes["form__btn-group"]}`}>
                    <button
                        className={`${classes["form__btn"]}`}
                    >
                        Schedule
                    </button>
                </div>
            </form>
        </FormCard>
    );
};

export default MakeAppointmentForm;
