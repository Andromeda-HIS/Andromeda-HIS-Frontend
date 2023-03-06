import classes from "./ScheduleTest.module.css";

import { useEffect } from "react";

const ScheduleTest = () => {

    useEffect(() => {
        testDetailsHandler();
    }, [])

    const testDetailsResponseHandler = (data) => {
        console.log(data);
    };

    const testDetailsHandler = async () => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/clerk/tests/`;
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => testDetailsResponseHandler(data))
            .catch((error) => console.log(error));
    }


    return (
        <div className={classes["main"]}>
            Test
        </div>
    );  

};

export default ScheduleTest;
