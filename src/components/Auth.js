import React, { useEffect, useState, useContext} from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import AuthNav from "./containers/AuthNav/AuthNav";
import UserContext from "../UserContext";
import Gameslist from "./containers/Gameslist/Gameslist";

export default function Auth () {
    const { userInfo } = useContext(UserContext);
    const { userEmail, setUserEmail } = userInfo;   
    const cookies = new Cookies();
    const token = cookies.get("token");
    const [message, setMessage] = useState("");
    const backendURL = process.env.REACT_APP_NODE_BACKEND || "http://localhost:4000";

// 1/9/23: Perhaps do an axios request to get the user object and display their info on their account page

    useEffect(() => {
        const config = {
            method: "get",
            url: `${backendURL}/auth`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios(config)
            .then(result => {
                setMessage(result.data.message);
                setUserEmail(result.data.user.email);
            })
            .catch(error => {
                console.log("auth: ", error);
            })

            const localData = window.localStorage.getItem('email');
            setUserEmail(JSON.parse(localData));
    }, [])

    const logout = () => {
        cookies.remove("token", { path: "/"});
        window.location.href = "/continue";
    }

    return (
        <div>
                        <AuthNav username={userEmail && userEmail.substring(0, userEmail.indexOf("@"))} logout={() => logout()} />
            <Gameslist />
        </div>
    )
}