import React, { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import "./SignUp.css";
import UserContext from '../../../UserContext';

export default function SignUp () {
    const [register, setRegister] = useState(false);
    const [registerMsg, setRegisterMsg] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { userInfo } = useContext(UserContext);
    const { login, setLogin, userEmail, setUserEmail } = userInfo;



    const handleSubmit = (e) => {
        e.preventDefault();

        const config = {
            method: "post",
            url: "http://localhost:4000/register",
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
            })
            .catch(error => {
                console.log("axios error: ", error);
            })

        alert("Submitted");
    }
        
    return (
        <div className="sf2__register__container">
            <Form onSubmit={e => handleSubmit(e)}>
                <Form.Group controlId="formBasicEmail" size="lg" className="mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        name="email" 
                        value={email}
                        placeholder="Enter email address..." 
                        onChange={e => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                
                <Form.Group size="lg" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password" 
                        name="password"
                        value={password}
                        placeholder="Enter password..."
                        onChange={e => setPassword(e.target.value)} >
                    </Form.Control>
                </Form.Group>
                <Button 
                    block 
                    size="lg" 
                    type="submit" 
                    className="btn btn-primary mt-4">
                        Register
                </Button>
            </Form>
            <p>{registerMsg}</p>
        </div>
    )
}