import React, { useEffect, useState, useContext} from "react";
import { Button } from "react-bootstrap";
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

// 1/9/23: Perhaps do an axios request to get the user object and display their info on their account page

    useEffect(() => {
        const config = {
            method: "get",
            url: "http://localhost:4000/auth",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios(config)
            .then(result => {
                setMessage(result.data.message);
                console.log("auth result: ", result);
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

    // let username = userEmail.substring(0, userEmail.indexOf("@"));

    return (
        <div>
            <AuthNav username={userEmail && userEmail.substring(0, userEmail.indexOf("@"))} logout={() => logout()} />
            {/* <h1>Welcome {userEmail && userEmail.substring(0, userEmail.indexOf("@"))}</h1> */}
            <Gameslist />
            {/* <h3 className="text-center text-danger">{message}</h3> */}
            {/* <Button type="submit" variant="danger" onClick={() => logout()}>Logout</Button> */}
        </div>
    )
}