import Sidebar from "../../components/sidebar/Sidebar";
import Title from "../../components/title/Title";
import Feedback from "../../components/feedback/Feedback";

import classes from "./ProfilePage.module.css";

import UserContext from "../../store/user-context";
import { useContext } from "react";

const ProfilePage = () => {

    const userCtx = useContext(UserContext);
    console.log("Inside profile page");
    console.log(userCtx);

    return (
        <div className={`crown ${classes["dashboard"]}`}>
            <Sidebar />
            <div className={`scroller ${classes["dashboard-content"]}`}>
                <Title />
                <Feedback />
            </div>
        </div>
    );
};

export default ProfilePage;
