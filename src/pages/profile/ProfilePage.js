import Sidebar from "../../components/sidebar/Sidebar";
import Title from "../../components/title/Title";
import Feedback from "../../components/feedback/Feedback";

import AddUserForm from "../../components/adduserform/AddUserForm";
import DeleteUserForm from "../../components/deleteuserform/DeleteUserForm";
import RegisterPatientForm from "../../components/registerpatientform/RegisterPatientForm";
import TreatPatient from "../../components/treatpatient/TreatPatient";

import classes from "./ProfilePage.module.css";

import UserContext from "../../store/user-context";
import { useContext } from "react";
import AdmitPatient from "../../components/admitpatient/AdmitPatient";
import DischargePatient from "../../components/dischargepatient/DischargePatient";
import MakeAppointment from "../../components/makeappointment/MakeAppointment";
import SearchBar from "../../components/searchbar/SearchBar";
import SearchPatient from "../../components/searchpatient/SearchPatient";
import ScheduleTest from "../../components/scheduletest/ScheduleTest";
import ScheduleTreatment from "../../components/scheduletreatment/ScheduleTreatment";

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
        content = <AddUserForm />;
    } else if (props.tab === "Delete User") {
        content = <DeleteUserForm />;
    } else if (props.tab === "Register Patient") {
        content = <RegisterPatientForm />;
    } else if (props.tab === "Admit Patient") {
        content = <AdmitPatient />;
    } else if (props.tab === "Make Appointment") {
        content = <MakeAppointment />;
    } else if (props.tab === "Discharge Patient") {
        content = <DischargePatient />;
    } else if (props.tab === "Search Patient") {
        content = <SearchPatient />;
    } else if (props.tab === "Treat") {
        content = <TreatPatient />;
    } else if (props.tab === "Schedule Test") {
        content = <ScheduleTest />;
    } else if (props.tab === "Schedule Treatment") {
        content = <ScheduleTreatment />;
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
