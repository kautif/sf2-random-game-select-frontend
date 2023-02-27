import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import "./SignUp.css";

export default function SignUp () {
    const [registerMsg, setRegisterMsg] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState("");
    const backendURL = process.env.REACT_APP_NODE_BACKEND || "http://localhost:4000";
    let symbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password.length < 8) {
            setValidation("Password length must be at least 8 characters");
        } else if (!symbols.test(password) || !/\d/.test(password)) {
            setValidation("Include at least one special character and one number in your password");
        } else {
            const config = {
                method: "post",
                url: `${backendURL}/register`,
                data: {
                    email,
                    password
                }
            }
            axios(config)
                .then(result => {
                    console.log("axios result: ", result);
                    console.log("server message: ", result.data.message);
                    setRegisterMsg(result.data.message);
                    setValidation("");
                })
                .catch(error => {
                    console.log("axios error: ", error);
                })
        }
    }

    function handlePassword (e) {
        console.log("handlePw: ", e.target.value);
        // if (e.target.value.length < 8) {
        //     setValidation("Password length must be at least 8 characters");
        // }
    }
        
    return (
        <div className="sf2__register__container">
            <Form onSubmit={e => handleSubmit(e)}>
                <Form.Group controlId="formBasicEmail" size="lg" className="mt-3">
                    <Form.Control 
                        type="email" 
                        name="email" 
                        value={email}
                        placeholder="Enter email address..." 
                        onChange={e => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                
                <Form.Group size="lg" className="mt-3">
                    <Form.Control
                        type="password" 
                        name="password"
                        value={password}
                        placeholder="Enter password..."
                        onChange={e => setPassword(e.target.value)} >
                    </Form.Control>
                </Form.Group>
                <p className="text-danger">{validation}</p>
                <Button 
                    block 
                    size="lg" 
                    type="submit" 
                    className="btn btn-primary mt-4">
                        Register
                </Button>
            </Form>
            <p className="text-danger">{registerMsg}</p>
        </div>
    )
}