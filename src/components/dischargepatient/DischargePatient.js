// import DischargePatientForm from "../dischargepatientform/DischargePatientForm";
import classes from "./DischargePatient.module.css";

import { useCallback } from "react";

import { useState, useEffect } from "react";

const DischargePatient = () => {
    const [admittances, setAdmittances] = useState(null);
    const [selectedAdmittance, setSelectedAdmittance] = useState(null);

    const admittanceChangeHandler = (index) => {
        setSelectedAdmittance(admittances[index]);
    };

    const admittanceDetailsResponseHandler = (data) => {
        console.log(data);
        const receivedAdmittances = [];
        for (let receivedAdmittance of data.data) {
            receivedAdmittances.push({
                patientId: receivedAdmittance[0],
                patientName: receivedAdmittance[1],
                roomId: receivedAdmittance[2],
            });
        }
        console.log(receivedAdmittances);
        setAdmittances(receivedAdmittances);
    };

    const admittanceDetailsHandler = useCallback(async () => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/receptionist/admittances`;
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => admittanceDetailsResponseHandler(data))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        if (!admittances) {
            admittanceDetailsHandler();
        }
    }, [admittanceDetailsHandler, admittances]);

    let admittanceErrorMessage = null;
    if (!selectedAdmittance) {
        admittanceErrorMessage = "Admittance not selected.";
    }

    const dischargeResponseHandler = (data) => {
        console.log(data);
        setAdmittances(null);
        // showModalHandler("Discharge Patient", "Successfully discharged the patient.");
    };

    const dischargeHandler = async (discharge) => {
        window.scroll(0, 0);
        console.log(discharge);
        const url = `http://localhost:8000/receptionist/discharge/`;
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ patient_id: +discharge.patientId }),
        })
            .then((response) => response.json())
            .then((data) => dischargeResponseHandler(data))
            .catch((error) => console.log(error));
    };

    const submitHandler = () => {
        dischargeHandler({ patientId: +selectedAdmittance.patientId });
    }

    return (
        <>
            <div className={classes["rooms"]}>
                {!admittances && <p>Loading</p>}
                {admittances &&
                    admittances.map((admittance, index) => (
                        <div
                            key={index}
                            onClick={() => admittanceChangeHandler(index)}
                            className={`${classes["available"]} ${
                                selectedAdmittance &&
                                selectedAdmittance.roomId === admittance.roomId
                                    ? classes["selected"]
                                    : ""
                            }`}
                        >
                            <h2 className={classes["name"]}>
                                {admittance.roomId}
                            </h2>
                            <h2 className={classes["name"]}>
                                Patient ID:{admittance.patientId}
                            </h2>
                            <h2 className={classes["name"]}>
                                Name:{admittance.patientName}
                            </h2>
                        </div>
                    ))}

                <div className={classes["error-message"]}>
                    {admittanceErrorMessage ? admittanceErrorMessage : " "}
                </div>
            </div>
            <div className={`${classes["form__btn-group"]}`}>
                <button
                    className={`${classes["form__btn"]}`}
                    onClick={submitHandler}
                >
                    Discharge
                </button>
            </div>
        </>
    );
};

export default DischargePatient;
