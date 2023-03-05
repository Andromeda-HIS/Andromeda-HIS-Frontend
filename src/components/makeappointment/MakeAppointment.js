import { useState, useEffect } from "react";

import MakeAppointmentForm from "../makeappointmentform/MakeAppointmentForm";

import classes from "./MakeAppointment.module.css";

const MakeAppointment = () => {
    const [doctors, setDoctors] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [doctorAvailable, setDoctorAvailable] = useState(true);

    useEffect(() => {
        doctorDetailsHandler();
    }, []);

    const doctorChangeHandler = (index) => {
        setSelectedDoctor(doctors[index]);
    };

    const doctorAvailabilityChangeHandler = (availability) => {
        setDoctorAvailable(availability);
    };

    const appointmentHandler = () => {
        setSelectedDoctor(null);
    };

    const doctorDetailsResponseHandler = (data) => {
        console.log(data);
        const receivedDoctors = [];
        for (let receivedDoctor of data.data) {
            receivedDoctors.push({
                userName: receivedDoctor[0],
                name: receivedDoctor[1],
                department: receivedDoctor[2],
            });
        }
        console.log(receivedDoctors);
        setDoctors(receivedDoctors);
    };

    const doctorDetailsHandler = async () => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/receptionist/doctors`;
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => doctorDetailsResponseHandler(data))
            .catch((error) => console.log(error));
    };

    return (
        <>
            <div className={classes["rooms"]}>
                {!doctors && <p>Loading</p>}
                {doctors &&
                    doctors.map((doctor, index) => (
                        <div
                            key={index}
                            onClick={() => doctorChangeHandler(index)}
                            className={`${classes["available"]} ${
                                selectedDoctor &&
                                selectedDoctor.userName === doctor.userName
                                    ? classes["selected"]
                                    : ""
                            }`}
                        >
                            {doctor.name} &nbsp; {doctor.department}
                        </div>
                    ))}
            </div>
            <div>{!doctorAvailable ? "Doctor not available" : " "}</div>
            <div>{!selectedDoctor ? "Doctor not selected" : " "}</div>
        
            <MakeAppointmentForm
                selected={selectedDoctor}
                onAppointment={appointmentHandler}
                onChangeDoctorAvailablility={doctorAvailabilityChangeHandler}
            />
        </>
    );
};

export default MakeAppointment;
