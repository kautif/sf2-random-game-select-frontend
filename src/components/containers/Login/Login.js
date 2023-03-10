import React, {useState, useContext, useEffect} from 'react';
import UserContext from "../../../UserContext";

import "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Login () {
    const { userInfo } = useContext(UserContext);
    const { login, setLogin } = userInfo;
    
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const backendURL = process.env.REACT_APP_NODE_BACKEND || "http://localhost:4000";
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        setMessage("Authenticating...")
        const cookies = new Cookies();
        const config = {
            method: "post",
            url: `${backendURL}/login`,
            data: {
                email,
                password
            }
        }

        axios(config)
            .then(result => {
                setLogin(true);
                cookies.set("token", result.data.token, { path: "/"});
                console.log("Login result: ", result);
            })
            .catch(error => {
                setLogin(false);
                setMessage("Invalid Credentials");
                console.log("Login Error: ", error);
            })

    }

    useEffect(() => {
        window.localStorage.setItem('email', JSON.stringify(email));
    }, [email])

    useEffect(() => {
        if (login) {
            console.log("logged in to /user");
            history.push('/user');
        }
    }, [login])

    return (
        <div className="sf2__login-container">
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group size="lg" controlId="email" className="mt-3">
                    <Form.Control
                        type="email"
                        value={email}
                        placeholder="Enter email address..."
                        onChange={e => {setEmail(e.target.value)}}
                        />
                </Form.Group>

                <Form.Group size="lg" controlId="password" className="mt-3">
                    <Form.Control
                        type="password"
                        value={password}
                        placeholder="Enter password..."
                        onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <div className="text-center">
                    <Button type="submit" size="lg" className="btn btn-primary mt-4">
                        Login
                    </Button>
                </div>
            </Form>
            <div className="sf2__login-test">
                <p className="sf2__login-user">test username: kautif@gmail.com</p>
                <p className="sf2__login-pw">test pw: testtest</p>
            </div>
            {message && <p className="text-danger">{message}</p>}
        </div>
    )
}