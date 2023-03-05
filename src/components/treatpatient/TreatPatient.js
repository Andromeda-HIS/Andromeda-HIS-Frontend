import UserContext from "../../store/user-context";
import { useState, useContext, useEffect } from "react";

import classes from "./TreatPatient.module.css";
import TreatPatientForm from "../treatpatientform/TreatPatientForm";

const TreatPatient = () => {
    const userCtx = useContext(UserContext);

    const [appointments, setAppointments] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        if (!selectedAppointment) {
            appointmentDetailsHandler();
        }
    }, [selectedAppointment]);

    const appointmentDetailsResponseHandler = (data) => {
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
    };

    const appointmentDetailsHandler = async () => {
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
    };

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
                    <div>{selectedAppointment.patientAddress}</div>
                    <div>{selectedAppointment.symptoms}</div>
                    <div>{selectedAppointment.date.toString()}</div>
                    <TreatPatientForm
                        patientId={selectedAppointment.patientId}
                        appointmentId={selectedAppointment.appointmentId}
                        onBack={goBackHandler}
                    />
                </div>
            )}
        </>
    );
};

export default TreatPatient;
