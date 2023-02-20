import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FreeComponent () {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const config = {
            method: "get",
            url: "http://localhost:4000/nonmember"
        }

        axios(config)
            .then(result => {
                setMessage(result.data.message);
            })
            .catch(error => {
                // error = new Error();
                console.log("free error: ", error);
            })
    }, [])

    return (
        <div>\
            <h1>Open Access Component</h1>
            <h3 className="text-center text-danger">{message}</h3>
        </div>
    )
}