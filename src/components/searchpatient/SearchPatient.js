import { useState, useEffect, useContext } from "react";
import SearchBar from "../searchbar/SearchBar";

import UserContext from "../../store/user-context";

import Table from "../table/Table";

import classes from "./SearchPatient.module.css";

const queryMatch = (patientName, queryString) => {
    if (queryString.trim() !== "") {
        return patientName.toLowerCase().includes(queryString.toLowerCase());
    }
    return true;
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
        const url = `http://localhost:8000/doctor/all_patients?doctor_username=${userCtx.user.userName}`;
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
            tests: data.tests
        });
    };

    const patientMoreDetailsHandler = async (id) => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/doctor/patient?doctor_username=${userCtx.user.userName}&patient_id=${id}`;
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
                    <ul className={classes["patient-preview__list"]}>
                        {patients &&
                            patients.map(
                                (patient) =>
                                    queryMatch(
                                        patient.name,
                                        queryString.slice()
                                    ) && (
                                        <li
                                            key={patient.id}
                                            className={
                                                classes["patient-preview"]
                                            }
                                            onClick={() =>
                                                patientMoreDetailsHandler(
                                                    patient.id
                                                )
                                            }
                                        >
                                            <p className={classes["id"]}>
                                                {patient.id}
                                            </p>
                                            <p className={classes["name"]}>
                                                {patient.name}
                                            </p>
                                        </li>
                                    )
                            )}
                    </ul>
                </div>
            )}
            {selectedPatient && (
                // <ul className={classes["patient-details__list"]}>
                //     <li
                //         className={classes["patient-details"]}
                //     >
                //         <p className={classes["field"]}>Id</p>
                //         <p className={classes["value"]}>{selectedPatient.id}</p>
                //     </li>
                //     <li
                //         className={classes["patient-details"]}
                //     >
                //         <p className={classes["field"]}>Name</p>
                //         <p className={classes["value"]}>{selectedPatient.name}</p>
                //     </li>
                //     <li
                //         className={classes["patient-details"]}
                //     >
                //         <p className={classes["field"]}>Address</p>
                //         <p className={classes["value"]}>{selectedPatient.address}</p>
                //     </li>
                //     <li
                //         className={classes["patient-details"]}
                //     >
                //         <p className={classes["field"]}>Admitted</p>
                //         <p className={classes["value"]}>{selectedPatient.admitted}</p>
                //     </li>
                //     <li
                //         className={classes["patient-details"]}
                //     >
                //         <p className={classes["field"]}>Room</p>
                //         <p className={classes["value"]}>{selectedPatient.room}</p>
                //     </li>
                // </ul>
                <div className={classes["more__details"]}>
                    <div className={classes["details__table-container"]}>
                        <Table
                            title="Patient Details"
                            data={[
                                { field: "Id", value: selectedPatient.id },
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

                    {selectedPatient.treatments && selectedPatient.treatments.length !== 0 && <div className={classes["treatment__table-container"]}>
                        <Table
                            title="Treatments"
                            data={selectedPatient.treatments.map((treatment, index)  => {return {field: index + 1, value: treatment[1]}})}
                            className={classes["treatment__table"]}
                        />
                    </div>}

                    {selectedPatient.tests && selectedPatient.tests.length !== 0 && <div className={classes["treatment__table-container"]}>
                        <Table
                            title="Tests"
                            data={selectedPatient.tests.map((test, index) => {return {field: index + 1, value: test[1]}})}
                            className={classes["treatment__table"]}
                        />
                    </div>}

                    <button className={classes["go-back__btn"]} onClick={goBackHandler}>
                        Go Back
                    </button>
                </div>
            )}
        </>
    );
};

export default SearchPatient;
