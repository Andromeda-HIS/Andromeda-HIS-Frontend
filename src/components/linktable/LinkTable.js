import classes from "./LinkTable.module.css";

const LinkTable = (props) => {
    return (
        <div className={classes["table"]}>
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
                    <div
                        key={index}
                        className={classes["row"]}
                        onClick={() => props.onSelectLink(props.byId ? props.ids[index] : index)}
                    >
                        {row.map((col, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`${classes["col"]} ${classes["value"]}`}
                                >
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

export default LinkTable;
