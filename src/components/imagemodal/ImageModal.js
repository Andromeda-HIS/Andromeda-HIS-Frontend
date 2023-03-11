import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDOM from "react-dom";

import classes from "./ImageModal.module.css";

const Backdrop = () => {
    return <div className={classes["backdrop"]} />;
};

const ModalOverlay = (props) => {
    return (
        <>
            <FontAwesomeIcon icon={faX} className={classes["modal__icon"]} onClick={props.onConfirm} />
            <div className={classes["modal"]}>
                <div className={classes["modal__img-container"]}>
                    <img src={props.src} className={classes["modal__img"]} />
                </div>
            </div>
        </>
    );
};

const ImageModal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop />,
                document.getElementById("backdrop-root")
            )}
            {ReactDOM.createPortal(
                <ModalOverlay src={props.src} onConfirm={props.onConfirm} />,
                document.getElementById("overlay-root")
            )}
        </>
    );
};

export default ImageModal;
