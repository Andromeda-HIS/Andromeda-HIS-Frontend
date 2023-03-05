import { useState, useEffect, useContext } from "react";
import SearchBar from "../searchbar/SearchBar";

import UserContext from "../../store/user-context";

import classes from "./SearchPatient.module.css";

const SearchPatient = () => {
    const [patients, setPatients] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);

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

    const patientMoreDetailsResponseHandler = (data) => {
        setSelectedPatient({ address: data.patient_address });
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
            .then((data) => patientMoreDetailsResponseHandler(data))
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
                    <SearchBar />
                    {patients &&
                        patients.map((patient) => (
                            <div
                                key={patient.id}
                                className={classes["patient-preview"]}
                                onClick={() =>
                                    patientMoreDetailsHandler(patient.id)
                                }
                            >
                                {patient.id} &nbsp; {patient.name}
                            </div>
                        ))}
                </div>
            )}
            {selectedPatient && (
                <div>
                    <div>{selectedPatient.address}</div>
                    <button onClick={goBackHandler}>Go Back</button>
                </div>
            )}
        </>
    );
};

export default SearchPatient;
