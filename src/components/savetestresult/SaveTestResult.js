import { useState, useCallback, useEffect } from "react";
import LinkTable from "../linktable/LinkTable";
import SaveTestResultForm from "./SaveTestResultForm";
import classes from "./SaveTestResult.module.css";

const SaveTestResult = () => {
    const [tests, setTests] = useState(null);
    const [selectedTest, setSelectedTest] = useState(null);

    const finishHandler = () => {
        setSelectedTest(null);
    }

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
    }, [testDetailsHandler, selectedTest]);

    const uploadReportHandler = (id) => {
        setSelectedTest(tests.filter((test) => test.testId === id)[0]);
    };

    return (
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
