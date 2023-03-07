import classes from "./GenericTable.module.css";

const GenericTable = (props) => {
    return (
        <div className={`${classes["table"]} ${props.className}`}>
            <div className={classes["row"]}>
                <h1 className={classes["table-heading"]}>{props.title}</h1>
            </div>
            <div className={classes["row"]}>
                {props.fields.map((field, index) => {
                    return (
                        <div key={index} className={`${classes["col"]} ${classes["field"]}`}>
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
                                <div key={index} className={`${classes["col"]} ${classes["value"]}`}>
                                    {col}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default GenericTable;
