import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./ContactPage.module.css";
import saptarshi from "./imgs/saptarshi.jpg";
import ayush from "./imgs/ayush.jpg";
import ritwik from "./imgs/ritwik.jpg";
import vignan from "./imgs/vignan.jpg";

const ContactPage = () => {
    return (
        <div className={classes["container"]}>
            <div className={classes["card"]}>
                <div className={classes["card__image-container"]}>
                    <img
                        src={ayush}
                        alt="Person"
                        className={classes["card__image"]}
                    />
                </div>
                <p className={classes["card__name"]}>Ayush Dwivedi</p>
                <div className={classes["info__block"]}>
                    <div className={classes["info"]}>
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            className={classes["icon"]}
                        />{" "}
                        ayushdwivedi1254@gmail.com
                    </div>
                    <div className={classes["info"]}>
                        <FontAwesomeIcon
                            icon={faPhone}
                            className={classes["icon"]}
                        />{" "}
                        6391116056
                    </div>
                </div>
            </div>
            <div className={classes["card"]}>
                <div className={classes["card__image-container"]}>
                    <img
                        src={ritwik}
                        alt="Person"
                        className={`${classes["card__image"]} ${classes["ritwik"]}`}
                    />
                </div>
                <p className={classes["card__name"]}>Ritwik Ranjan Mallik</p>
                <div className={classes["info__block"]}>
                    <div className={classes["info"]}>
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            className={classes["icon"]}
                        />{" "}
                        mallikritwik2014@gmail.com
                    </div>
                    <div className={classes["info"]}>
                        <FontAwesomeIcon
                            icon={faPhone}
                            className={classes["icon"]}
                        />{" "}
                        8617290014
                    </div>
                </div>
            </div>
            <div className={classes["card"]}>
                <div className={classes["card__image-container"]}>
                    <img
                        src={vignan}
                        alt="Person"
                        className={`${classes["card__image"]} ${classes["vignan"]}`}
                    />
                </div>
                <p className={classes["card__name"]}>
                    Sake Venkata Vignan Kumar
                </p>
                <div className={classes["info__block"]}>
                    <div className={classes["info"]}>
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            className={classes["icon"]}
                        />{" "}
                        venkatavignankumar@gmail.com
                    </div>
                    <div className={classes["info"]}>
                        <FontAwesomeIcon
                            icon={faPhone}
                            className={classes["icon"]}
                        />{" "}
                        9390171516
                    </div>
                </div>
            </div>
            <div className={classes["card"]}>
                <div className={classes["card__image-container"]}>
                    <img
                        src={saptarshi}
                        alt="Person"
                        className={`${classes["card__image"]} ${classes["saptarshi"]}`}
                    />
                </div>
                <p className={classes["card__name"]}>Saptarshi De Chaudhury</p>
                <div className={classes["info__block"]}>
                    <div className={classes["info"]}>
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            className={classes["icon"]}
                        />{" "}
                        saptarshi_dechaudhury@outlook.com
                    </div>
                    <div className={classes["info"]}>
                        <FontAwesomeIcon
                            icon={faPhone}
                            className={classes["icon"]}
                        />{" "}
                        9051045291
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
