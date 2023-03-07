import UserContext from "../../store/user-context";
import { useState, useContext, useEffect, useCallback } from "react";

import classes from "./TreatPatient.module.css";
import TreatPatientForm from "../treatpatientform/TreatPatientForm";

import Table from "../table/Table";

const TreatPatient = () => {
    const userCtx = useContext(UserContext);

    const [appointments, setAppointments] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const appointmentDetailsResponseHandler = useCallback((data) => {
        let receivedAppointments = [];
        for (let receivedAppointment of data.data) {
            receivedAppointments.push({
                appointmentId: +receivedAppointment[0],
                patientId: +receivedAppointment[1],
                date: new Date(receivedAppointment[2]),
                symptoms: receivedAppointment[3],
            });
        }

        console.log(receivedAppointments);
        setAppointments(receivedAppointments);
    }, []);

    const appointmentDetailsHandler = useCallback(async () => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/doctor/all_appointments?doctor_username=${userCtx.user.userName}`;
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => appointmentDetailsResponseHandler(data))
            .catch((error) => console.log(error));
    }, [userCtx.user.userName, appointmentDetailsResponseHandler]);

    useEffect(() => {
        if (!selectedAppointment) {
            appointmentDetailsHandler();
        }
    }, [selectedAppointment, appointmentDetailsHandler]);

    const appointmentResolveResponseHandler = (data) => {
        console.log(data);
        let appointmentDetails = appointments.filter(
            (appointment) => appointment.patientId === data.patientId
        );
        appointmentDetails = {
            ...appointmentDetails[0],
            patientName: data.patient_name,
            patientAddress: data.patient_address,
        };
        console.log(appointmentDetails);
        setSelectedAppointment(appointmentDetails);
    };

    const appointmentResolveHandler = async (id) => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/doctor/patient?doctor_username=${userCtx.user.userName}&patient_id=${id}`;
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) =>
                appointmentResolveResponseHandler({ ...data, patientId: id })
            )
            .catch((error) => console.log(error));
    };

    const goBackHandler = () => {
        setSelectedAppointment(null);
    };

    return (
        <>
            {!selectedAppointment && (
                <div className={classes["search-patient"]}>
                    {appointments &&
                        appointments.map((appointment) => (
                            <div
                                key={appointment.appointmentId}
                                className={classes["patient-preview"]}
                                onClick={() =>
                                    appointmentResolveHandler(
                                        appointment.patientId
                                    )
                                }
                            >
                                {appointment.appointmentId} &nbsp;{" "}
                                {appointment.symptoms}
                            </div>
                        ))}
                </div>
            )}
            {selectedAppointment && (
                <div>
                    <Table
                        title="Patient Details"
                        data={[
                            {
                                field: "Id",
                                value: selectedAppointment.appointmentId,
                            },
                            {
                                field: "patientId",
                                value: selectedAppointment.patientId,
                            },
                            {
                                field: "Name",
                                value: selectedAppointment.patientName,
                            },
                            {
                                field: "Address",
                                value: selectedAppointment.patientAddress,
                            },
                            {
                                field: "Symptoms",
                                value: selectedAppointment.symptoms,
                            },
                        ]}
                    />
                    <TreatPatientForm
                        patientId={selectedAppointment.patientId}
                        appointmentId={selectedAppointment.appointmentId}
                        onBack={goBackHandler}
                    />
                    <button
                        className={`${classes["go-back__btn"]}`}
                        onClick={goBackHandler}
                    >
                        Go Back
                    </button>
                </div>
            )}
        </>
    );
};

export default TreatPatient;
