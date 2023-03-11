import ReactDOM from "react-dom";

import classes from "./ResponseModal.module.css";

const Backdrop = () => {
    return <div className={classes["backdrop"]} />;
};

const ModalOverlay = (props) => {
    return (
        <div className={classes["modal"]}>
            <h2 className={classes["modal__title"]}>{props.title}</h2>
            <div className={classes["modal__content"]}>
                <p className={classes["modal__message"]}>{props.message}</p>
                <div className={classes["modal__btn__container"]}>
                    <button
                        onClick={props.onConfirm}
                        className={classes["modal__btn"]}
                    >
                        Ok
                    </button>
                </div>
            </div>
        </div>
    );
};

const ResponseModal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop />,
                document.getElementById("backdrop-root")
            )}
            {ReactDOM.createPortal(
                <ModalOverlay
                    onConfirm={props.onConfirm}
                    title={props.title}
                    message={props.message}
                />,
                document.getElementById("overlay-root")
            )}
        </>
    );
};

export default ResponseModal;
