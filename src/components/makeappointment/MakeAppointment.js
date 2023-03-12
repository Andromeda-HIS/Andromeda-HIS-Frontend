import { useState, useEffect, useCallback } from "react";
import MakeAppointmentForm from "../makeappointmentform/MakeAppointmentForm";
import classes from "./MakeAppointment.module.css";

const MakeAppointment = () => {
    const [doctors, setDoctors] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const doctorChangeHandler = (index) => {
        if (selectedDoctor && selectedDoctor.index === index) {
            setSelectedDoctor(null);
        } else {
            setSelectedDoctor({...doctors[index], index});
        }
    };

    const appointmentHandler = () => {
        setSelectedDoctor(null);
    };

    const doctorDetailsResponseHandler = (data) => {
        const receivedDoctors = [];
        for (let receivedDoctor of data.data) {
            receivedDoctors.push({
                userName: receivedDoctor[0],
                name: receivedDoctor[1],
                department: receivedDoctor[2],
            });
        }
        setDoctors(receivedDoctors);
    };

    const doctorDetailsHandler = useCallback(async () => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/receptionist/doctors/`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => doctorDetailsResponseHandler(data))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        doctorDetailsHandler();
    }, [doctorDetailsHandler]);

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
                            <h2 className={classes["name"]}>{doctor.name}</h2>
                            <p className={classes["department"]}>
                                {doctor.department}
                            </p>
                        </div>
                    ))}
            </div>

            <MakeAppointmentForm
                selected={selectedDoctor}
                onAppointment={appointmentHandler}
            />
        </>
    );
};

export default MakeAppointment;
