// import DischargePatientForm from "../dischargepatientform/DischargePatientForm";
import classes from "./DischargePatient.module.css";

import { useCallback } from "react";

import { useState, useEffect } from "react";

import ResponseModal from "../responsemodal/ResponseModal";

const DischargePatient = () => {
    const [admittances, setAdmittances] = useState(null);
    const [selectedAdmittance, setSelectedAdmittance] = useState(null);
    const [modalOn, setModalOn] = useState(false);
    const [modalTitle, setModalTitle] = useState(null);
    const [modalMessage, setModalMessage] = useState(null);

    const hideModalHandler = () => {
        setModalOn(false);
    };

    const showModalHandler = (title, message) => {
        setModalTitle(title);
        setModalMessage(message);
        setModalOn(true);
    };

    const admittanceChangeHandler = (index) => {
        if (selectedAdmittance && selectedAdmittance.index === index) {
            setSelectedAdmittance(null);
        } else {
            setSelectedAdmittance({ ...admittances[index], index });
        }
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

    if (!admittances || (admittances && admittances.length === 0)) {
        admittanceErrorMessage = "No admittances were found.";
    }

    const dischargeResponseHandler = (data) => {
        if (data.success) {
            console.log(data);
            setAdmittances(null);
            showModalHandler(
                "Discharge Patient",
                "Successfully discharged the patient."
            );
        }
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
    };

    return (
        <>
            <div className={classes["rooms"]}>
                {!admittances && <p>Loading</p>}
                {modalOn && (
                    <ResponseModal
                        onConfirm={hideModalHandler}
                        title={modalTitle}
                        message={modalMessage}
                    />
                )}
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
                            <h1 className={classes["name"]}>
                                {admittance.roomId}
                            </h1>
                            <div>
                                <h3 className={classes["card__info"]}>
                                    <h3 className={classes["card__info-title"]}>
                                        ID
                                    </h3>
                                    <p className={classes["card__info-value"]}>
                                        {admittance.patientId}
                                    </p>
                                </h3>
                                <h3 className={classes["card__info"]}>
                                    <h3 className={classes["card__info-title"]}>
                                        Name
                                    </h3>
                                    <p className={classes["card__info-value"]}>
                                        {admittance.patientName}
                                    </p>
                                </h3>
                            </div>
                        </div>
                    ))}
            </div>
            <div className={classes["admittance-error"]}>
                {admittanceErrorMessage ? (
                    <p className={classes["admittance-error__message"]}>
                        {admittanceErrorMessage}
                    </p>
                ) : (
                    <p className={classes["admittance-error__message"]}>
                        &nbsp;
                    </p>
                )}
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
