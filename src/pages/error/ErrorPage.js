import { Link } from "react-router-dom";
import classes from "./ErrorPage.module.css";

const ErrorPage = (props) => {
    return (
        <div className={`crown scroller ${classes["error__container"]}`}>
            <div className={classes["error"]}>
                <h1 className={classes["error__status"]}>{props.status}</h1>
                <h2 className={classes["error__title"]}>{props.title}</h2>
                <p className={classes["error__message"]}>{props.message}</p>
                <Link to={props.link} className={classes["error__btn"]}>{props.linkTitle}</Link>
            </div>
        </div>
    );
};

export default ErrorPage;
