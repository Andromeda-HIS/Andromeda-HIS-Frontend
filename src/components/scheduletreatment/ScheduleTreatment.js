import classes from "./ScheduleTreatment.module.css";

import { useEffect } from "react";

const ScheduleTreatment = () => {

    useEffect(() => {
        treatmentDetailsHandler();
    }, [])

    const treatmentDetailsResponseHandler = (data) => {
        console.log(data);
    };

    const treatmentDetailsHandler = async () => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/clerk/treatments/`;
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => treatmentDetailsResponseHandler(data))
            .catch((error) => console.log(error));
    }


    return (
        <div className={classes["main"]}>
            Treatment
        </div>
    );  

};

export default ScheduleTreatment;