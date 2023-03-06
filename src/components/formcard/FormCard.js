import classes from "./FormCard.module.css";

const FormCard = (props) => {
    return (
        <div className={classes["form-card"]}>
            <div className={classes["form-card__slanted"]}>
                {props.children}
            </div>
        </div>
    );
};

export default FormCard;
