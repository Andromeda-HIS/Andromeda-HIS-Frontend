import AdmitPatientForm from "../admitpatientform/AdmitPatientForm";
import classes from "./AdmitPatient.module.css";
import { useState, useEffect } from "react";

const AdmitPatient = () => {
    const [rooms, setRooms] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [recentlyAdmitted, setRecentlyAdmitted] = useState(true);

    useEffect(() => {
        if (recentlyAdmitted) {
            roomDetailsHandler();
            setRecentlyAdmitted(false);
        }
    }, [recentlyAdmitted]);

    const roomChangeHandler = (index) => {
        setSelectedRoom(rooms[index]);
    };

    const admitHandler = () => {
        setRecentlyAdmitted(true);
        setSelectedRoom(null);
    }

    const roomDetailsResponseHandler = (data) => {
        console.log(data);
        const receivedRooms = [];
        for (let receivedRoom of data.data) {
            // console.log(receivedRoom);
            receivedRooms.push({
                id: +receivedRoom[0],
                available: receivedRoom[1],
            });
        }
        // console.log(receivedRooms);
        setRooms(receivedRooms);
    };

    const roomDetailsHandler = async () => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/receptionist/rooms`;
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => roomDetailsResponseHandler(data))
            .catch((error) => console.log(error));
    };

    return (
        <>
            <div className={classes["rooms"]}>
                {!rooms && <p>Loading</p>}
                {rooms &&
                    rooms.map((room, index) => (
                        <div
                            key={index}
                            onClick={() => roomChangeHandler(index)}
                            className={
                                `${room.available
                                    ? classes["available"]
                                    : classes["not-available"]} ${selectedRoom && selectedRoom.id === room.id ? classes["selected"] : ""}`
                            }
                        ></div>
                    ))}
            </div>
            <AdmitPatientForm selected={selectedRoom} onAdmit={admitHandler}/>
        </>
    );
};

export default AdmitPatient;
