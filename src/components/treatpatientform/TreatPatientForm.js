import classes from "./TreatPatientForm.module.css";
import useInput from "../../hooks/use-input";
import { useState, useEffect, useContext } from "react";

import FormCard from "../formcard/FormCard";

import UserContext from "../../store/user-context";

const TreatPatientForm = (props) => {
    const isNotEmpty = (value) => value.trim() !== "";
    const userCtx = useContext(UserContext);

    const {
        value: test,
        isValid: testIsValid,
        hasError: testInputHasError,
        valueChangeHandler: testChangeHandler,
        inputBlurHandler: testInputBlurHandler,
        reset: resetTest,
    } = useInput(() => true);

    const {
        value: treatment,
        isValid: treatmentIsValid,
        hasError: treatmentInputHasError,
        valueChangeHandler: treatmentChangeHandler,
        inputBlurHandler: treatmentInputBlurHandler,
        reset: resetTreatment,
    } = useInput(() => true);

    const [bothEmpty, setBothEmpty] = useState();

    useEffect(() => {
        if (test.trim() === "" && treatment.trim() === "") {
            setBothEmpty(true);
        }
    }, [test, treatment]);

    const masterTestChangeHandler = (event) => {
        testChangeHandler(event);
        setBothEmpty(false);
    };

    const masterTreatmentChangeHandler = (event) => {
        treatmentChangeHandler(event);
        setBothEmpty(false);
    };

    const appointmentResolveResponseHandler = (data) => {
        console.log(data);
        if (data.success) {
            props.onBack();
        }
    };

    const appointmentResolveHandler = async (appointmentResult) => {
        window.scroll(0, 0);
        console.log(appointmentResult);
        const url = `http://localhost:8000/doctor/appointment/`;
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(appointmentResult)
        })
            .then((response) => response.json())
            .then((data) => appointmentResolveResponseHandler(data))
            .catch((error) => console.log(error));
    };

    const submitHandler = (event) => {
        event.preventDefault();
        
        const appointmentResult = {
            patient_id: props.patientId,
            appointment_id: props.appointmentId,
            doctor_username: userCtx.user.userName,
            procedure_name: test.trim() === "" ? null : test.trim(),
            prescription: treatment.trim() === "" ? null : treatment.trim()
        };

        appointmentResolveHandler(appointmentResult);
    };

    return (
        <FormCard>
            <form
                className={`${classes["form"]}`}
                autoComplete="off"
                onSubmit={submitHandler}
            >
                <h1 className={classes["form__title"]}>Prescribe</h1>
                <div className={`${classes["form__inputs"]}`}>
                    <div className={classes["input"]}>
                        <label
                            className={`${classes["input__label"]}`}
                            htmlFor="test"
                        >
                            Test
                        </label>
                        <input
                            className={classes["input__field"]}
                            id="test"
                            type="text"
                            value={test}
                            name="test"
                            onChange={masterTestChangeHandler}
                            onBlur={testInputBlurHandler}
                        />
                    </div>

                    <div className={classes["input"]}>
                        <label
                            className={`${classes["input__label"]}`}
                            htmlFor="userName"
                        >
                            Treatment
                        </label>
                        <input
                            className={classes["input__field"]}
                            id="treatment"
                            type="text"
                            value={treatment}
                            name="username"
                            onChange={masterTreatmentChangeHandler}
                            onBlur={treatmentInputBlurHandler}
                        />
                    </div>
                </div>
                {bothEmpty ? (
                    <p className={classes["input__message"]}>
                        {"Please enter a test or treatment."}
                    </p>
                ) : (
                    <p>&nbsp;</p>
                )}
                <div className={`${classes["form__btn-group"]}`}>
                    <button
                        className={`${classes["form__btn"]}`}
                        // disabled={!formIsValid}
                    >
                        Prescribe
                    </button>
                </div>
            </form>
        </FormCard>
    );
};

export default TreatPatientForm;
