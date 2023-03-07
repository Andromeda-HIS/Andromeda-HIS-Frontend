import classes from "./ScheduleTest.module.css";

import { useState, useEffect, useRef, useCallback } from "react";
import Table from "../table/Table";

const ScheduleTest = () => {
    const [tests, setTests] = useState(null);
    const [selectedTest, setSelectedTest] = useState(null);

    const dateInputRef = useRef();

    const testDetailsResponseHandler = useCallback((data) => {
        console.log(data);
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

        console.log(receivedTests);
        if (receivedTests.length === 0) {
            setTests(null);
        } else {
            setTests(receivedTests);
        }
    }, []);

    const testDetailsHandler = useCallback(async () => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/clerk/tests/`;
        await fetch(url, {
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
        console.log(index);
        setSelectedTest(tests[index]);
    };

    const submitHandler = () => {
        const testLog = {
            date: dateInputRef.current.value,
            test_id: selectedTest.testId
        };


        console.log(testLog);
        scheduleTestHandler(testLog);
    }

    const scheduleTestResponseHandler = (data) => {
        console.log(data);
        if (!data.success) {

        } else {
            setSelectedTest(null);
        }
    }

    const scheduleTestHandler = async (testLog) => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/clerk/savetests/`;
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(testLog)
        })
            .catch((error) => console.log(error))
            .then((response) => response.json())
            .then((data) => scheduleTestResponseHandler(data));
    };

    return (
        <div className={classes["schedule-test"]}>
            {!tests && (
                <p className={classes["not-found"]}>
                    No Pending Tests Found
                </p>
            )}
            {!selectedTest && tests && (
                <ul className={classes["patient-preview__list"]}>
                    {tests.map((test, index) => (
                        <li
                            key={index}
                            className={classes["patient-preview"]}
                            onClick={() => testMoreDetailsHandler(index)}
                        >
                            <p className={classes["id"]}>{test.id}</p>
                            <p className={classes["name"]}>
                                {test.patientName}
                            </p>
                            <p className={classes["test-name"]}>
                                {test.testName}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
            {selectedTest && (
                <div className={classes["more__details"]}>
                    <div className={classes["details__table-container"]}>
                        <Table
                            title="Test Details"
                            data={[
                                {
                                    field: "treatmenId",
                                    value: selectedTest.testId,
                                },
                                {
                                    field: "patientId",
                                    value: selectedTest.patientId,
                                },
                                {
                                    field: "patientName",
                                    value: selectedTest.patientName,
                                },
                                {
                                    field: "doctorName",
                                    value: selectedTest.doctorName,
                                },
                                {
                                    field: "testName",
                                    value: selectedTest.testName,
                                },
                            ]}
                            className={classes["details__table"]}
                        />
                    </div>
                    <input type="date" ref={dateInputRef} />
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
