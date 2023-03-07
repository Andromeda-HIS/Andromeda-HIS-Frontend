import LoginForm from "../../components/loginform/LoginForm";

import classes from "./LoginPage.module.css";

const LoginPage = () => {
    return (
        <div className={`crown scroller ${classes["login__container"]}`}>
            <div className={classes["login"]}>
                <div className={classes["book"]}>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
