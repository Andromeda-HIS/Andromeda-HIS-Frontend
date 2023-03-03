import classes from "./Features.module.css";
import "./icon-font-basic.css";
import "./icon-font-ecommerce.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedkit, faTree, faUserNurse, faMoneyBill,  } from '@fortawesome/free-solid-svg-icons';

const Features = () => {
    return (
        <section className={classes["section-features"]}>
            <ul className={classes["features__list"]}>
                <li className={classes["feature-box"]}>
                    <FontAwesomeIcon icon={faMedkit} className={classes["feature-box__icon"]}></FontAwesomeIcon>
                    <h3 className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}>Latest Equipments</h3>
                    <p className={classes["feature-box__text"]}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                    </p>
                </li>
                <li className={classes["feature-box"]}>
                    <FontAwesomeIcon icon={faTree} className={classes["feature-box__icon"]}></FontAwesomeIcon>
                    <h3 className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}>Natural Bliss</h3>
                    <p className={classes["feature-box__text"]}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                    </p>
                </li>
                <li className={classes["feature-box"]}>
                <FontAwesomeIcon icon={faUserNurse} className={classes["feature-box__icon"]}></FontAwesomeIcon>
                    <h3 className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}>Cooperative Stuff</h3>
                    <p className={classes["feature-box__text"]}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                    </p>
                </li>
                <li className={classes["feature-box"]}>
                    <FontAwesomeIcon icon={faMoneyBill} className={classes["feature-box__icon"]}></FontAwesomeIcon>
                    <h3 className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}>Cheap and Affordable</h3>
                    <p className={classes["feature-box__text"]}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                    </p>
                </li>
            </ul>
        </section>
    );
};

export default Features;
