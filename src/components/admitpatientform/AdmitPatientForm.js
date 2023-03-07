import { useState, useEffect } from "react";
import useInput from "../../hooks/use-input";
import FormCard from "../formcard/FormCard";
import ResponseModal from "../responsemodal/ResponseModal";


import classes from "./AdmitPatientForm.module.css";

const isNotEmpty = (value) => value.trim() !== "";


const AdmitPatientForm = (props) => {
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

    const [patientIdExists, setPatientIdExists] = useState(true);
    const [alreadyAdmitted, setAlreadyAdmitted] = useState(false);

    const normalClasses = classes["input__field"];
    const errorClasses = classes["input__error"];

    const patientIdInputClasses =
        patientIdInputHasError ||
        !patientIdExists ||
        !props.selected ||
        (props.selected && !props.selected.available) ||
        alreadyAdmitted
            ? errorClasses
            : normalClasses;

    let patientIdErrorMessage = null;
    if (patientIdInputHasError) {
        patientIdErrorMessage = "Patient Id cannot be empty,";
    } else if (!patientIdExists) {
        patientIdErrorMessage = "Patient does not exist.";
    } else if (!props.selected) {
        patientIdErrorMessage = "Please select a room.";
    } else if (props.selected && !props.selected.available) {
        patientIdErrorMessage =
            "Room not available. Please select another room.";
    } else if (alreadyAdmitted) {
        patientIdErrorMessage = "Patient already admitted.";
    }

    const submitHandler = (event) => {
        event.preventDefault();

        admitHandler({ patient_id: +patientId, room_id: props.selected.id });
    };

    const admitResponseHandler = (data) => {
        console.log(data);
        if (!data.success) {
            if (data.errorMessage === "No such patient found") {
                setPatientIdExists(false);
            } else {
                setAlreadyAdmitted(true);
            }
        } else {
            props.onAdmit();
            resetPatientId();
            showModalHandler("Admit Patient", "Successfully admitted the patient.");
        }
    };

    const admitHandler = async (admittance) => {
        window.scroll(0, 0);
        console.log(admittance);
        const url = `http://localhost:8000/receptionist/admit/`;
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(admittance),
        })
            .then((response) => response.json())
            .then((data) => admitResponseHandler(data))
            .catch((error) => console.log(error));
    };

    const masterPatientIdChangeHandler = (event) => {
        patientIdChangeHandler(event);
        setPatientIdExists(true);
        setAlreadyAdmitted(false);
    };

    return (
        <FormCard>
            <form
                className={`${classes["form"]}`}
                autoComplete="off"
                onSubmit={submitHandler}
            >
                {modalOn && <ResponseModal onConfirm={hideModalHandler} title={modalTitle} message={modalMessage}/>}
                <h1 className={classes["form__title"]}>Admit Patient</h1>
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
                        Admit
                    </button>
                </div>
            </form>
        </FormCard>
    );
};

export default AdmitPatientForm;
