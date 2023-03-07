import classes from "./ScheduleTreatment.module.css";

import { useState, useEffect, useRef, useCallback } from "react";
import Table from "../table/Table";

const ScheduleTreatment = () => {
    const [treatments, setTreatments] = useState(null);
    const [selectedTreatment, setSelectedTreatment] = useState(null);

    const dateInputRef = useRef();

    

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

        console.log(receivedTreatments);
        if(receivedTreatments.length===0){
            setTreatments(null);
        }
        else{
            setTreatments(receivedTreatments);
        }
    }, []);

    const treatmentDetailsHandler = useCallback(async () => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/clerk/treatments/`;
        await fetch(url, {
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
        console.log(index);
        setSelectedTreatment(treatments[index]);
    };

    const submitHandler = () => {
        const treatmentLog = {
            date: dateInputRef.current.value,
            treatment_id: selectedTreatment.treatmentId
        };


        console.log(treatmentLog);
        scheduleTreatmentHandler(treatmentLog);
    }

    const scheduleTreatmentResponseHandler = (data) => {
        console.log(data);
        if (!data.success) {

        } else {
            setSelectedTreatment(null);
        }
    }

    const scheduleTreatmentHandler = async (treatmentLog) => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/clerk/savetreatments/`;
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(treatmentLog)
        })
            .catch((error) => console.log(error))
            .then((response) => response.json())
            .then((data) => scheduleTreatmentResponseHandler(data));
    };

    return (
        <div className={classes["schedule-treatment"]}>
            {!treatments && (
                <p className={classes["not-found"]}>
                    No Pending Treatments Found
                </p>
            )}
            {!selectedTreatment && treatments && (
                <ul className={classes["patient-preview__list"]}>
                    {treatments.map((treatment, index) => (
                        <li
                            key={index}
                            className={classes["patient-preview"]}
                            onClick={() => treatmentMoreDetailsHandler(index)}
                        >
                            <p className={classes["id"]}>{treatment.id}</p>
                            <p className={classes["name"]}>
                                {treatment.patientName}
                            </p>
                            <p className={classes["treatment-name"]}>
                                {treatment.treatmentName}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
            {selectedTreatment && (
                <div className={classes["more__details"]}>
                    <div className={classes["details__table-container"]}>
                        <Table
                            title="Treatment Details"
                            data={[
                                {
                                    field: "treatmenId",
                                    value: selectedTreatment.treatmentId,
                                },
                                {
                                    field: "patientId",
                                    value: selectedTreatment.patientId,
                                },
                                {
                                    field: "patientName",
                                    value: selectedTreatment.patientName,
                                },
                                {
                                    field: "doctorName",
                                    value: selectedTreatment.doctorName,
                                },
                                {
                                    field: "treatmentName",
                                    value: selectedTreatment.treatmentName,
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
