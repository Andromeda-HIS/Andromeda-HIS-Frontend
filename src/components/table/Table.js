import classes from "./Table.module.css";

const Table = (props) => {

    return (
        <div className={`${classes["table"]} ${props.className}`}>
            <h1 className={classes["table__title"]}>{props.title}</h1>
            <ul className={classes["table__list"]}>
                {props.data.map((dataPoint, index) => (
                    <li key={index} className={classes["table__list-item"]}>
                        <p className={classes["field"]}>{dataPoint.field}</p>
                        <p className={classes["value"]}>{dataPoint.value}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Table;
