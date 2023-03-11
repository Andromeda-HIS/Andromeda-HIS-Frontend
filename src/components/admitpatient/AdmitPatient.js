import { useState, useEffect, useCallback } from "react";
import AdmitPatientForm from "../admitpatientform/AdmitPatientForm";
import classes from "./AdmitPatient.module.css";

const AdmitPatient = () => {
    const [rooms, setRooms] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [recentlyAdmitted, setRecentlyAdmitted] = useState(true);

    const roomChangeHandler = (index) => {
        if (selectedRoom && selectedRoom.index === index) {
            setSelectedRoom(null);
        } else {
            setSelectedRoom({...rooms[index], index});
        }
    };

    const admitHandler = () => {
        setRecentlyAdmitted(true);
        setSelectedRoom(null);
    };

    const roomDetailsResponseHandler = useCallback((data) => {
        const receivedRooms = [];
        for (let receivedRoom of data.data) {
            receivedRooms.push({
                id: +receivedRoom[0],
                available: receivedRoom[1],
            });
        }
        setRooms(receivedRooms);
    }, []);

    const roomDetailsHandler = useCallback(async () => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/receptionist/rooms`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => roomDetailsResponseHandler(data))
            .catch((error) => console.log(error));
    }, [roomDetailsResponseHandler]);

    useEffect(() => {
        if (recentlyAdmitted) {
            roomDetailsHandler();
            setRecentlyAdmitted(false);
        }
    }, [roomDetailsHandler, recentlyAdmitted]);

    return (
        <>
            <div className={classes["rooms"]}>
                {!rooms && <p>Loading</p>}
                {rooms &&
                    rooms.map((room, index) => (
                        <div
                            key={index}
                            onClick={() => roomChangeHandler(index)}
                            className={`${
                                room.available
                                    ? classes["available"]
                                    : classes["not-available"]
                            } ${
                                selectedRoom && selectedRoom.id === room.id
                                    ? (room.available ? classes["available-selected"] : classes["not-available-selected"])
                                     : ""
                            }`}
                        >
                            <h2 className={classes["name"]}>{room.id}</h2>
                        </div>
                    ))}
            </div>
            <AdmitPatientForm selected={selectedRoom} onAdmit={admitHandler} />
        </>
    );
};

export default AdmitPatient;
