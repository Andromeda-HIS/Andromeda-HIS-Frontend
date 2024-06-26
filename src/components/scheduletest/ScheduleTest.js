import { useState, useEffect, useCallback } from "react";
import useInput from "../../hooks/use-input";
import Table from "../table/Table";
import LinkTable from "../linktable/LinkTable";
import ResponseModal from "../responsemodal/ResponseModal";
import classes from "./ScheduleTest.module.css";

const isNotEmpty = (value) => value.trim() !== "";

const ScheduleTest = () => {
    const [tests, setTests] = useState(null);
    const [selectedTest, setSelectedTest] = useState(null);
    const [dateViolatesPhysics, setDateViolatesPhysics] = useState(true);
    const [modalOn, setModalOn] = useState(false);
    const [modalTitle, setModalTitle] = useState(null);
    const [modalMessage, setModalMessage] = useState(null);

    const hideModalHandler = () => {
        setModalOn(false);
        setSelectedTest(null);
    }

    const showModalHandler = (title, message) => {
        resetDate();
        setModalTitle(title);
        setModalMessage(message);
        setModalOn(true);
    }

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

    const testDetailsResponseHandler = useCallback((data) => {
        let receivedTests = [];
        for (let receivedTest of data.data) {
            receivedTests.push({
                testId: +receivedTest[0],
                patientId: +receivedTest[1],
                patientName: receivedTest[2],
                doctorUsername: receivedTest[3],
                doctorName: receivedTest[4],
                testName: receivedTest[5],
            });
        }

        if (receivedTests.length === 0) {
            setTests(null);
        } else {
            setTests(receivedTests);
        }
    }, []);

    const testDetailsHandler = useCallback(async () => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/clerk/tests/`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => testDetailsResponseHandler(data))
            .catch((error) => console.log(error));
    }, [testDetailsResponseHandler]);

    useEffect(() => {
        if (!selectedTest) {
            testDetailsHandler();
        }
    }, [selectedTest, testDetailsHandler]);

    const goBackHandler = () => {
        setSelectedTest(null);
    };

    const testMoreDetailsHandler = (index) => {
        setSelectedTest(tests[index]);
    };

    const submitHandler = () => {
        if (dateIsValid && !dateViolatesPhysics) {
            const testLog = {
                date: date,
                test_id: selectedTest.testId,
            };

            scheduleTestHandler(testLog);
        }
    };

    const scheduleTestResponseHandler = (data) => {
        if (!data.success) {
        } else {
            showModalHandler("Schedule Test", "Successfully scheduled test.");
        }
    };

    const scheduleTestHandler = async (testLog) => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/clerk/savetests/`;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(testLog),
        })
            .then((response) => response.json())
            .then((data) => scheduleTestResponseHandler(data))
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
        <div className={classes["schedule-test"]}>
            {modalOn && <ResponseModal onConfirm={hideModalHandler} title={modalTitle} message={modalMessage}/>}
            {!tests && (
                <div className={classes["table__container"]}>
                    <p className={classes["not-found"]}>
                        No Pending Tests Found
                    </p>
                </div>
            )}
            {!selectedTest && tests && (
                <div className={classes["table__container"]}>
                    <LinkTable
                        fields={[
                            "Test ID",
                            "Patient ID",
                            "Patient Name",
                            "Doctor Username",
                            "Test Name",
                        ]}
                        rows={tests.map((test) => [
                            test.testId,
                            test.patientId,
                            test.patientName,
                            test.doctorUsername,
                            test.testName,
                        ])}
                        onSelectLink={testMoreDetailsHandler}
                        byId={false}
                    />
                </div>
            )}
            {selectedTest && (
                <div className={classes["more__details"]}>
                    <div className={classes["details__table-container"]}>
                        <Table
                            title="Test Details"
                            data={[
                                {
                                    field: "ID",
                                    value: selectedTest.testId,
                                },
                                {
                                    field: "Patient ID",
                                    value: selectedTest.patientId,
                                },
                                {
                                    field: "Patient Name",
                                    value: selectedTest.patientName,
                                },
                                {
                                    field: "Doctor Name",
                                    value: selectedTest.doctorName,
                                },
                                {
                                    field: "Name",
                                    value: selectedTest.testName,
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
                        Log Test
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

export default ScheduleTest;
