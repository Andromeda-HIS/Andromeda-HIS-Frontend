import classes from "./SaveTestResult.module.css";

import useInput from "../../hooks/use-input";

import { useState, useCallback, useEffect } from "react";

import LinkTable from "../linktable/LinkTable";
import SaveTestResultForm from "./SaveTestResultForm";
import { useFetcher } from "react-router-dom";

const SaveTestResult = () => {
    const [tests, setTests] = useState(null);
    const [selectedTest, setSelectedTest] = useState(null);

    const finishHandler = () => {
        setSelectedTest(null);
    }

    useEffect(() => {
        if (!selectedTest) {
            testDetailsHandler();
        }
    }, [selectedTest]);

    const testDetailsResponseHandler = useCallback((data) => {
        const receivedTests = [];
        for (let receivedTest of data.data) {
            receivedTests.push({
                testId: +receivedTest[0],
                patientId: +receivedTest[1],
                patientName: receivedTest[2],
                testName: receivedTest[5],
            });
        }
        setTests(receivedTests);
    }, []);

    const testDetailsHandler = useCallback(async () => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/clerk/testresults/`;
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => testDetailsResponseHandler(data))
            .catch((error) => console.log(error));
    }, []);

    const uploadReportHandler = (id) => {
        // console.log("HI");
        // console.log(tests.filter((test) => test.testId === id)[0]);
        setSelectedTest(tests.filter((test) => test.testId === id)[0]);
    };

    return (
        // <form onSubmit={submitHandler}>
        //     <label htmlFor="img">Select image:</label>
        //     <input type="text" />
        //     <input type="file" id="img" name="img" accept="image/*" />
        //     <button type="submit">Submit</button>
        // </form>
        <div className={classes["main"]}>
            {tests && selectedTest && (
                <SaveTestResultForm id={selectedTest.testId} onBack={finishHandler} />
            )}
            {!selectedTest && tests && tests.length > 0 && (
                <div className={classes["table__container"]}>
                    <LinkTable
                        fields={[
                            "Test ID",
                            "Patient ID",
                            "Patient Name",
                            "Test Name",
                        ]}
                        rows={tests.map((test) => [
                            test.testId,
                            test.patientId,
                            test.patientName,
                            test.testName,
                        ])}
                        onSelectLink={uploadReportHandler}
                        ids={tests.map((test) => test.testId)}
                        byId={true}
                    />
                </div>
            )}
            {(!selectedTest && !tests) ||
                (tests && tests.length === 0 && (
                    <div className={classes["table__container"]}>
                        <p className={classes["not-found"]}>
                            No Test Results Found
                        </p>
                    </div>
                ))}
        </div>
    );
};

export default SaveTestResult;
