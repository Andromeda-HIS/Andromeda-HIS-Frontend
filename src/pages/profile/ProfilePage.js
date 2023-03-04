import Sidebar from "../../components/sidebar/Sidebar";
import Title from "../../components/title/Title";
import Feedback from "../../components/feedback/Feedback";

import RegisterForm from "../../components/registerform/RegisterForm";
import RemoveForm from "../../components/removeform/RemoveForm";

import classes from "./ProfilePage.module.css";

import UserContext from "../../store/user-context";
import { useContext } from "react";

const ProfilePage = (props) => {
    const userCtx = useContext(UserContext);

    let content;
    if (props.tab === "Account") {
        content = (
            <>
                <Title />
                <Feedback />
            </>
        );
    } else if (props.tab === "Add User") {
        content = <RegisterForm />;
    } else if (props.tab === "Delete User") {
        content = <RemoveForm />;
    }

    return (
        <div className={`crown ${classes["dashboard"]}`}>
            <Sidebar />
            <div className={`scroller ${classes["dashboard__content"]}`}>
                {content}
            </div>
        </div>
    );
};

export default ProfilePage;
