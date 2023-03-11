import classes from "./GenericTable.module.css";
import { useState } from "react";

import ImageModal from "../imagemodal/ImageModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const GenericTable = (props) => {
    console.log(props);
    const [modalOn, setModalOn] = useState(false);
    const [modalSrc, setModalSrc] = useState(null);

    const hideModalHandler = () => {
        setModalSrc(null);
        setModalOn(false);
    }

    const showModalHandler = (src) => {
        setModalSrc(src);
        setModalOn(true);
    }

    return (
        <div className={`${classes["table"]} ${props.className}`}>
            {modalOn && <ImageModal src={modalSrc} onConfirm={hideModalHandler} />}
            <div className={classes["row"]}>
                <h1 className={classes["table-heading"]}>{props.title}</h1>
            </div>
            <div className={classes["row"]}>
                {props.fields.map((field, index) => {
                    return (
                        <div
                            key={index}
                            className={`${classes["col"]} ${classes["field"]}`}
                        >
                            {field}
                        </div>
                    );
                })}
            </div>
            {props.rows.map((row, index) => {
                return (
                    <div key={index} className={classes["row"]}>
                        {row.map((col, index) => {
                            return (
                                <>
                                    {index !== props.imgOverlayFieldNo && (
                                        <div
                                            key={index}
                                            className={`${classes["col"]} ${classes["value"]}`}
                                        >
                                            {col}
                                        </div>
                                    )}
                                    {index === props.imgOverlayFieldNo && <div
                                            key={index}
                                            className={`${classes["col"]} ${classes["value"]}`}
                                        >
                                            {col === "NA" ? "NA" : <FontAwesomeIcon icon={faImage} onClick={() => showModalHandler(col)} className={classes["img__link"]}/>}
                                        </div>}
                                </>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default GenericTable;
