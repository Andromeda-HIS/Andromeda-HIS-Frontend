import classes from "./Title.module.css";

const Title = () => {
    return (
        <header className={classes["header"]}>
            <div className={classes["header__text-box"]}>
                <h1 className={classes["heading-primary"]}>
                    <span className={classes["heading-primary--main"]}>Andromeda</span>
                    <span className={classes["heading-primary--sub"]}>360&deg; medicare solutions</span>
                </h1>
            </div>
        </header>
    );
};

export default Title;