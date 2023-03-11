import { useContext } from "react";
import UserContext from "../../store/user-context";

import Sidebar from "../../components/sidebar/Sidebar";
import ErrorPage from "../error/ErrorPage";

import Account from "../../components/account/Account";
import AddUserForm from "../../components/adduserform/AddUserForm";
import DeleteUserForm from "../../components/deleteuserform/DeleteUserForm";

import RegisterPatientForm from "../../components/registerpatientform/RegisterPatientForm";
import AdmitPatient from "../../components/admitpatient/AdmitPatient";
import MakeAppointment from "../../components/makeappointment/MakeAppointment";
import DischargePatient from "../../components/dischargepatient/DischargePatient";

import SearchPatient from "../../components/searchpatient/SearchPatient";
import TreatPatient from "../../components/treatpatient/TreatPatient";

import ScheduleTest from "../../components/scheduletest/ScheduleTest";
import ScheduleTreatment from "../../components/scheduletreatment/ScheduleTreatment";
import SaveTestResult from "../../components/savetestresult/SaveTestResult";

import classes from "./ProfilePage.module.css";

const ProfilePage = (props) => {
    const userCtx = useContext(UserContext);

    let content;
    if (props.tab === "Account") {
        content = <Account />;
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
    } else if (props.tab === "Save Test Result") {
        content = <SaveTestResult />;
    }

    const loggedInContent = (
        <div className={`crown ${classes["dashboard"]}`}>
            <Sidebar />
            <div className={`scroller ${classes["dashboard__content"]}`}>
                {content}
            </div>
        </div>
    );

    const notLoggedInContent = (
        <ErrorPage
            status={403}
            title="UH OH! You're sus!"
            message="You are either not logged in or have tried to access a functionality using the browser bar.
        For security measures, you have been logged out. Please login again."
            link="/login"
            linkTitle="Login"
        />
    );

    return <>{userCtx.isLoggedIn ? loggedInContent : notLoggedInContent}</>;
};

export default ProfilePage;
