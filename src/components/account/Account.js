import { useEffect, useState, useContext, useCallback } from "react";
import UserContext from "../../store/user-context";
import Table from "../table/Table";
import classes from "./Account.module.css";

const Account = () => {
    const [accountInfo, setAccountInfo] = useState(null);

    const userCtx = useContext(UserContext);

    const accountInfoResponseHandler = useCallback((data) => {
        let receivedAccountInfo = {
            userName: data.username,
            name: data.name,
            address: data.address,
        };

        if (userCtx.user.designation === "Doctor") {
            receivedAccountInfo = {
                ...receivedAccountInfo,
                department: data.department,
            };
        }

        setAccountInfo(receivedAccountInfo);
    }, [userCtx.user.designation]);

    const accountInfoHandler = useCallback(async () => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/profile/${userCtx.user.designation.toLowerCase()}/?username=${
            userCtx.user.userName
        }`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => accountInfoResponseHandler(data))
            .catch((error) => console.log(error));
    }, [accountInfoResponseHandler, userCtx.user.designation, userCtx.user.userName]);

    useEffect(() => {
        accountInfoHandler();
    }, [accountInfoHandler]);

    let tableData = null;
    if (accountInfo) {
        tableData = [
            {field: "Username", value: accountInfo.userName},
            {field: "Name", value: accountInfo.name},
            {field: "Address", value: accountInfo.address}
        ];
    
        if (userCtx.user.designation === "Doctor") {
            tableData.push({field: "Department", value: accountInfo.department});
        }
    }


    return (
        <div className={classes["account"]}>
            {accountInfo && <Table
                title="Account Information"
                data={tableData}
                className={classes["account__table"]}
            />}
        </div>
    );
};

export default Account;
