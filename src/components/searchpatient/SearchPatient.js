import { useState, useEffect, useContext } from "react";
import SearchBar from "../searchbar/SearchBar";

import UserContext from "../../store/user-context";

import Table from "../table/Table";
import GenericTable from "../generictable/GenericTable";
import ImageModal from "../imagemodal/ImageModal";
import LinkTable from "../linktable/LinkTable";

import classes from "./SearchPatient.module.css";

const queryMatch = (patientName, queryString) => {
    if (queryString.trim() !== "") {
        return patientName.toLowerCase().includes(queryString.toLowerCase());
    }
    return true;
};

const decodeImage = (encodedImage) => {
    // console.log(encodedImage);
    // const uint8Array = new TextEncoder().encode(encodedImage);

    // const blob = new Blob([uint8Array]);

    // const url = URL.createObjectURL(blob);
    return "data:image/jpeg;base64," + encodedImage;
};

const SearchPatient = () => {
    const [patients, setPatients] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [queryString, setQueryString] = useState("");

    const queryStringChangeHandler = (s) => {
        setQueryString(s);
    };

    const userCtx = useContext(UserContext);

    useEffect(() => {
        patientDetailsHandler();
    }, []);

    const patientDetailsResponseHandler = (data) => {
        console.log(data);
        let receivedPatients = [];
        for (let receivedPatient of data.data) {
            receivedPatients.push({
                id: +receivedPatient[0],
                name: receivedPatient[1],
            });
        }

        setPatients(receivedPatients);
    };

    const patientDetailsHandler = async () => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/doctor/all_patients/?doctor_username=${userCtx.user.userName}`;
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => patientDetailsResponseHandler(data))
            .catch((error) => console.log(error));
    };

    const patientMoreDetailsResponseHandler = (data, id) => {
        console.log(data);
        setSelectedPatient({
            id,
            name: data.patient_name,
            address: data.patient_address,
            admitted: data.admitted ? "Yes" : "No",
            room: data.room,
            treatments: data.treatments,
            tests: data.tests.map((test) => [
                test[0],
                test[1],
                test[2] ? test[2] : "Pending",
                test[3] ? decodeImage(test[3]) : "NA",
            ]),
        });
    };

    const patientMoreDetailsHandler = async (id) => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/doctor/patient/?doctor_username=${userCtx.user.userName}&patient_id=${id}`;
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => patientMoreDetailsResponseHandler(data, id))
            .catch((error) => console.log(error));
    };

    const goBackHandler = () => {
        console.log("In go back!");
        setSelectedPatient(null);
    };

    let testTableContent = null;
    if (selectedPatient && selectedPatient.tests) {
        testTableContent = {
            title: "Tests",
            fields: ["Test ID", "Test Name", "Test Result", "Report"],
            rows: selectedPatient.tests,
        };
    }

    let treatmentTableContent = null;
    if (selectedPatient && selectedPatient.treatments) {
        treatmentTableContent = {
            title: "Treatments",
            fields: ["Treatment ID", "Treatment Name"],
            rows: selectedPatient.treatments,
        };
    }

    return (
        <>
            {!selectedPatient && (
                <div className={classes["search-patient"]}>
                    <SearchBar onChangeQuery={queryStringChangeHandler} />
                    {patients &&
                        patients.filter((patient) =>
                            queryMatch(patient.name, queryString.slice())
                        ).length === 0 && (
                            <p className={classes["not-found"]}>
                                No Patients Found
                            </p>
                        )}
                    {patients && patients.filter(patient => queryMatch(patient.name, queryString.slice())).length > 0 && <LinkTable
                        fields={[
                            "Patient ID",
                            "Name"
                        ]}
                        rows={patients.filter(patient => queryMatch(patient.name, queryString.slice())).map((patient, index) => [
                            patient.id,
                            patient.name,
                        ])}
                        onSelectLink={patientMoreDetailsHandler}
                        ids={patients.filter(patient => queryMatch(patient.name, queryString.slice())).map(patient => patient.id)}
                        byId={true}
                    />}
                </div>
            )}
            {selectedPatient && (
                <div className={classes["more__details"]}>
                    <div className={classes["details__table-container"]}>
                        <Table
                            title="Patient Details"
                            data={[
                                { field: "ID", value: selectedPatient.id },
                                { field: "Name", value: selectedPatient.name },
                                {
                                    field: "Address",
                                    value: selectedPatient.address,
                                },
                                {
                                    field: "Admitted",
                                    value: selectedPatient.admitted,
                                },
                                { field: "Room", value: selectedPatient.room },
                            ]}
                            className={classes["details__table"]}
                        />
                    </div>

                    {selectedPatient.treatments &&
                        selectedPatient.treatments.length !== 0 && (
                            <div
                                className={
                                    classes["treatment__table-container"]
                                }
                            >
                                {/* <Table
                                    title="Treatments"
                                    data={selectedPatient.treatments.map(
                                        (treatment, index) => {
                                            return {
                                                field: index + 1,
                                                value: treatment[1],
                                            };
                                        }
                                    )}
                                    className={classes["treatment__table"]}
                                /> */}
                                <GenericTable
                                    title={treatmentTableContent.title}
                                    fields={treatmentTableContent.fields}
                                    rows={treatmentTableContent.rows}
                                    className={classes["treatment__table"]}
                                />
                            </div>
                        )}

                    {selectedPatient.tests &&
                        selectedPatient.tests.length !== 0 && (
                            <div
                                className={
                                    classes["treatment__table-container"]
                                }
                            >
                                {/* <Table
                            title="Tests"
                            data={selectedPatient.tests.map((test, index) => {return {field: index + 1, value: test[1]}})}
                            className={classes["treatment__table"]}
                        /> */}
                                <GenericTable
                                    title={testTableContent.title}
                                    fields={testTableContent.fields}
                                    rows={testTableContent.rows}
                                    className={classes["treatment__table"]}
                                    imgOverlayFieldNo={3}
                                />
                            </div>
                        )}

                    <button
                        className={classes["go-back__btn"]}
                        onClick={goBackHandler}
                    >
                        Go Back
                    </button>
                </div>
            )}
        </>
    );
};

export default SearchPatient;
