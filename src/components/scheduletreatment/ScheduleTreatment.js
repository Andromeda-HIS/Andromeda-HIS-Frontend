import { useState, useEffect, useCallback } from "react";
import useInput from "../../hooks/use-input";
import Table from "../table/Table";
import LinkTable from "../linktable/LinkTable";
import ResponseModal from "../responsemodal/ResponseModal";
import classes from "./ScheduleTreatment.module.css";

const isNotEmpty = (value) => value.trim() !== "";

const ScheduleTreatment = () => {
    const [treatments, setTreatments] = useState(null);
    const [selectedTreatment, setSelectedTreatment] = useState(null);
    const [dateViolatesPhysics, setDateViolatesPhysics] = useState(true);
    const [modalOn, setModalOn] = useState(false);
    const [modalTitle, setModalTitle] = useState(null);
    const [modalMessage, setModalMessage] = useState(null);

    const hideModalHandler = () => {
        setModalOn(false);
        setSelectedTreatment(null);
    };

    const showModalHandler = (title, message) => {
        resetDate();
        setModalTitle(title);
        setModalMessage(message);
        setModalOn(true);
    };

    const {
        value: date,
        isValid: dateIsValid,
        hasError: dateInputHasError,
        valueChangeHandler: dateChangeHandler,
        inputBlurHandler: dateInputBlurHandler,
        reset: resetDate,
    } = useInput(isNotEmpty);

    const normalClasses = classes["input__field"];
    const errorClasses = classes["input__error"];

    const dateInputClasses =
        dateInputHasError || dateViolatesPhysics ? errorClasses : normalClasses;

    const treatmentDetailsResponseHandler = useCallback((data) => {
        let receivedTreatments = [];
        for (let receivedTreatment of data.data) {
            receivedTreatments.push({
                treatmentId: +receivedTreatment[0],
                patientId: +receivedTreatment[1],
                patientName: receivedTreatment[2],
                doctorUsername: receivedTreatment[3],
                doctorName: receivedTreatment[4],
                treatmentName: receivedTreatment[5],
            });
        }

        if (receivedTreatments.length === 0) {
            setTreatments(null);
        } else {
            setTreatments(receivedTreatments);
        }
    }, []);

    const treatmentDetailsHandler = useCallback(async () => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/clerk/treatments/`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => treatmentDetailsResponseHandler(data))
            .catch((error) => console.log(error));
    }, [treatmentDetailsResponseHandler]);

    useEffect(() => {
        if (!selectedTreatment) {
            treatmentDetailsHandler();
        }
    }, [selectedTreatment, treatmentDetailsHandler]);

    const goBackHandler = () => {
        setSelectedTreatment(null);
    };

    const treatmentMoreDetailsHandler = (index) => {
        setSelectedTreatment(treatments[index]);
    };

    const submitHandler = () => {
        if (dateIsValid && !dateViolatesPhysics) {
            const treatmentLog = {
                date: date,
                treatment_id: selectedTreatment.treatmentId,
            };
            scheduleTreatmentHandler(treatmentLog);
        }
    };

    const scheduleTreatmentResponseHandler = (data) => {
        if (!data.success) {
        } else {
            showModalHandler(
                "Schedule Treatment",
                "Successfully scheduled treatment."
            );
        }
    };

    const scheduleTreatmentHandler = async (treatmentLog) => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/clerk/savetreatments/`;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(treatmentLog),
        })
            .then((response) => response.json())
            .then((data) => scheduleTreatmentResponseHandler(data))
            .catch((error) => console.log(error));
    };

    const masterDateChangeHandler = (event) => {
        dateChangeHandler(event);
        if (event.target.value) {
            const currentDate = new Date();
            const selectedDate = new Date(event.target.value);
            const diffDays = selectedDate.getDate() - currentDate.getDate();
            if (diffDays < 0 || diffDays > 6) {
                setDateViolatesPhysics(true);
            } else {
                setDateViolatesPhysics(false);
            }
        }
    };

    let dateErrorMessage = null;
    if (dateInputHasError) {
        dateErrorMessage = "Date cannot be empty.";
    } else if (dateViolatesPhysics) {
        dateErrorMessage = "Please enter a valid date.";
    }

    return (
        <div className={classes["schedule-treatment"]}>
            {modalOn && (
                <ResponseModal
                    onConfirm={hideModalHandler}
                    title={modalTitle}
                    message={modalMessage}
                />
            )}
            {!treatments && (
                <div className={classes["table__container"]}>
                    <p className={classes["not-found"]}>
                        No Pending Treatments Found
                    </p>
                </div>
            )}
            {!selectedTreatment && treatments && (
                <div className={classes["table__container"]}>
                    <LinkTable
                        fields={[
                            "Treatment ID",
                            "Patient ID",
                            "Patient Name",
                            "Doctor Username",
                            "Treatment Name",
                        ]}
                        rows={treatments.map((treatment) => [
                            treatment.treatmentId,
                            treatment.patientId,
                            treatment.patientName,
                            treatment.doctorUsername,
                            treatment.treatmentName,
                        ])}
                        onSelectLink={treatmentMoreDetailsHandler}
                        byId={false}
                    />
                </div>
            )}
            {selectedTreatment && (
                <div className={classes["more__details"]}>
                    <div className={classes["details__table-container"]}>
                        <Table
                            title="Treatment Details"
                            data={[
                                {
                                    field: "ID",
                                    value: selectedTreatment.treatmentId,
                                },
                                {
                                    field: "Patient ID",
                                    value: selectedTreatment.patientId,
                                },
                                {
                                    field: "Patient Name",
                                    value: selectedTreatment.patientName,
                                },
                                {
                                    field: "Doctor Name",
                                    value: selectedTreatment.doctorName,
                                },
                                {
                                    field: "Name",
                                    value: selectedTreatment.treatmentName,
                                },
                            ]}
                            className={classes["details__table"]}
                        />
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
                    <button
                        className={classes["go-back__btn"]}
                        onClick={submitHandler}
                    >
                        Log Treatment
                    </button>
                    <button
                        className={classes["go-back__btn"]}
                        onClick={goBackHandler}
                    >
                        Go Back
                    </button>
                </div>
            )}
        </div>
    );
};

export default ScheduleTreatment;
