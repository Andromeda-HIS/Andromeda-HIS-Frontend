import classes from "./Features.module.css";
import "./icon-font-basic.css";
import "./icon-font-ecommerce.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMedkit,
    faTree,
    faUserNurse,
    faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

const Features = () => {
    return (
        <section className={classes["section-features"]}>
            <ul className={classes["features__list"]}>
                <li className={classes["feature-box"]}>
                    <FontAwesomeIcon
                        icon={faMedkit}
                        className={classes["feature-box__icon"]}
                    ></FontAwesomeIcon>
                    <h3
                        className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}
                    >
                        Latest Equipments
                    </h3>
                    <p className={classes["feature-box__text"]}>
                        Our hospital has the latest test and treatments
                        facilities. We have state of art operating theatres,
                        surgical equipments and ample supply of essential as
                        well as special purpose medicines.
                    </p>
                </li>
                <li className={classes["feature-box"]}>
                    <FontAwesomeIcon
                        icon={faTree}
                        className={classes["feature-box__icon"]}
                    ></FontAwesomeIcon>
                    <h3
                        className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}
                    >
                        Natural Bliss
                    </h3>
                    <p className={classes["feature-box__text"]}>
                        Andromeda Hospital is surrounded by nature. It provides
                        a calming environment that can help reduce stress.
                        Patients have access to natural light, fresh air and
                        greenery, paving the way for shorter hospital stays and
                        less medication.
                    </p>
                </li>
                <li className={classes["feature-box"]}>
                    <FontAwesomeIcon
                        icon={faUserNurse}
                        className={classes["feature-box__icon"]}
                    ></FontAwesomeIcon>
                    <h3
                        className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}
                    >
                        Cooperative Stuff
                    </h3>
                    <p className={classes["feature-box__text"]}>
                        Our staff are dedicated to your service. Two emergency
                        doctors are availble 24x7. Trained nurses will take care
                        of your needs. Cleaning and disinfection is done
                        regularly to maintain a hygenic environment.
                    </p>
                </li>
                <li className={classes["feature-box"]}>
                    <FontAwesomeIcon
                        icon={faMoneyBill}
                        className={classes["feature-box__icon"]}
                    ></FontAwesomeIcon>
                    <h3
                        className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}
                    >
                        Cheap and Affordable
                    </h3>
                    <p className={classes["feature-box__text"]}>
                        Services at Andromeda are low-cost and cheap.
                        Preventative care, immunizations, or routine check-ups
                        are affordable. We also accept EMI as well.
                    </p>
                </li>
            </ul>
        </section>
    );
};

export default Features;
